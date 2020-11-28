const NormalDistribution = require('normal-distribution');
const dist = new NormalDistribution.default();
const Reminder = require('./reminder');


const freqMap = [
   [0],
   [0, 4],
   [0, 2, 4],
   [0, 2, 4, 6],
   [0, 2, 3, 4, 6],
   [0, 1, 2, 3, 4, 5],
   [0, 1, 2, 3, 4, 5, 6]
];

const getContext = (pillParams) => {
   return (pillParams.withFood && pillParams.withSleep) ? "FoodSleep" : pillParams.withSleep ? "Sleep" : pillParams.withFood ? "Food" : "Spaced";
}
 
const updateSchedule = (reqBody, user) => {
   let schedule = user.schedule;

   let timeTaken = reqBody.timeTaken;
   let reminderId = reqBody.reminderId;
   let dayReminders = schedule[timeTaken.day];

   let pillReminder = dayReminders.find(reminders => reminders !== null && reminders.reminderId === reminderId);
   if (pillReminder == null)
      return schedule;

   let timeTakenConverted = timeTaken.hour * 60 + timeTaken.minute;
   let reminderTimeConverted = pillReminder.time.reminderTime.hour * 60 + pillReminder.time.reminderTime.minute;

   let timeDiff = Math.abs(timeTakenConverted - reminderTimeConverted);

   if (timeDiff > 30) {
      pillReminder.timesLate++;
      if(pillReminder.timesLate === 3) {
         pillReminder.timesLate = 0;
         pillReminder.takenEarly = false;

         let newTime = 0;
         for(let time in pillReminder.adjustedTimes) {
            newTime += time;
         }
         newTime /= pillReminder.adjustedTimes.length;
         pillReminder.time.reminderTime = {hour: Math.floor(newTime/60) + 7 > 24 ? timeTaken.day + 2 : timeTaken.day + 1, minute: newTime % 60};
         pillReminder.adjustedTimes = [];
      }
      else {
         pillReminder.timesLate++;
         let percentageLate;
         let timeAdjust
         if(timeTakenConverted < reminderTimeConverted) {
            percentageLate = timeDiff / (pillReminder.time.leftBound * 60);
            timeAdjust = dist.cdf(3 * percentageLate) * 0.1;

            pillReminder.time.adjustedTimes.push(timeTakenConverted - timeAdjust);
         }  
         else {
            percentageLate = timeDiff / (pillReminder.time.rightBound * 60);
            timeAdjust = dist.cdf(3 * percentageLate);

            pillReminder.time.adjustedTimes.push(timeTakenConverted + timeAdjust);
         }
      }
   } 

   return schedule;
}

const deleteSchedule = (user, pillName) => {
   let schedule = user.schedule;

   schedule = schedule.map(day => {
      return day.filter(reminder => {
         reminder !== null && reminder.pillName !== pillName;
      })
   });
   console.log("IN DELETE SCHEDULE, ", schedule);

   return schedule;
};

const createSchedule = (pillParams, user) => {
   let schedule = user.schedule;
   let context = getContext(pillParams);
   
   const userTimes = {
      wakeupHr: user.wakeupAM ? (user.wakeupHr === 12 ? 0 : user.wakeupHr) : user.wakeupHr + 12,
      wakeupTime: (user.wakeupAM ? user.wakeupHr : user.wakeupHr + 12) * 60 + user.wakeupMin,
      sleepHr: user.sleepAM ? user.sleepHr : user.sleepHr + 12,
      sleepTime: (user.sleepAM ? user.sleepHr : user.sleepHr + 12) * 60 + user.sleepMin,
      breakfastHr: user.breakfastAM ? user.breakfastHr : user.breakfastHr + 12,
      breakfastTime: (user.breakfastAM ? user.breakfastHr : user.breakfastHr + 12) * 60 + user.breakfastMin,
      lunchHr: user.lunchAM ? user.lunchHr : user.lunchHr + 12,
      lunchTime: (user.lunchAM ? user.lunchHr : user.lunchHr + 12) * 60 + user.lunchMin,
      dinnerHr: user.dinnerAM ? user.dinnerHr: user.dinnerHr + 12,
      dinnerTime: (user.dinnerAM ? user.dinnerHr: user.dinnerHr + 12) * 60 + user.dinnerMin
   }
   
   let reminder = new Reminder(pillParams, user, userTimes);

   if(pillParams.frequencyUnit === 'daily') {
      if(context === "FoodSleep" || context === "Sleep") {
         for(let i = 0; i < 7; i++) {
            schedule[i].push(reminder.createReminder(context));
         }
      }
      else if(context === "Food") {
         for (let i = 0; i < 7; i++) {
            let mode;
            for (let j = 0; j < pillParams.frequency; j++) {
               mode = j === 0 ? "Breakfast" : j === 1 ? "Lunch" : "Dinner";
               schedule[i].push(reminder.createReminder(mode));
            }
         }
      }
      else {
         const timeSpacing = (userTimes.sleepTime - userTimes.wakeTime) / pillParams.frequency;
   
         for (let i = 0; i < 7; i++) {
            for (let j = 0; j < pillParams.frequency; j++) {
               hour = Math.floor((userTimes.wakeupTime + timeSpacing * (j + 1))/60);
               minute = (userTimes.wakeupTime + timeSpacing * (j + 1)) % 60;
               schedule[i].push(reminder.createReminder(context, hour, minute, Math.floor(timeSpacing / 60)));
            }
         }
      }
   }
   else {
      for (let day in freqMap[pillParams.frequency - 1]) {
         schedule[day].push(reminder.createReminder(context));
      }
   }

   return schedule;
} 

module.exports = {createSchedule, updateSchedule, deleteSchedule};
