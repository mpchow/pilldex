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

      let percentageLate;
      let timeAdjust;

      if(timeTakenConverted < reminderTimeConverted) {
         percentageLate = timeDiff / (pillReminder.time.leftBound * 60);
         timeAdjust = Math.floor(dist.cdf(3 * percentageLate) * 60);

         pillReminder.adjustedTimes.push(reminderTimeConverted - timeAdjust);
      }  
      else {
         percentageLate = timeDiff / (pillReminder.time.rightBound * 60);
         timeAdjust = Math.floor(dist.cdf(3 * percentageLate) * 60);

         pillReminder.adjustedTimes.push(reminderTimeConverted + timeAdjust);
      }

      if(pillReminder.timesLate === 3) {
         pillReminder.timesLate = 0;
         pillReminder.takenEarly = false;

         let newTime = 0;
         for(let i = 0; i < pillReminder.adjustedTimes.length; i++) {
            newTime += pillReminder.adjustedTimes[i];
         }
         newTime /= pillReminder.adjustedTimes.length;
         pillReminder.time.reminderTime = {hour: Math.floor(newTime/60), minute: Math.floor(newTime % 60)};
         pillReminder.adjustedTimes = [];
      }
   } 

   return schedule;
}

const deleteSchedule = (user, pillName) => {
   let schedule = user.schedule;
   
   for(let i = 0; i < schedule.length; i++) {
      schedule[i] = schedule[i].filter(reminder => {
         if(reminder !== null && reminder.pillName !== pillName) {
            return reminder;
         }
      })
   }

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
      dinnerHr: user.dinnerAM ? user.dinnerHr : user.dinnerHr + 12,
      dinnerTime: (user.dinnerAM ? user.dinnerHr: user.dinnerHr + 12) * 60 + user.dinnerMin
   }
   
   let reminder = new Reminder(pillParams, user, userTimes);

   if(pillParams.frequencyUnit === 'daily') {
      if(context === "FoodSleep" || context === "Sleep") {
         let reminderBody = reminder.createReminder(context);
         for(let i = 0; i < 7; i++) {
            schedule[i].push(reminderBody);
         }
      }
      else if(context === "Food") {
         let breakfastReminder = reminder.createReminder("Breakfast");
         let lunchReminder = reminder.createReminder("Lunch");
         let dinnerReminder = reminder.createReminder("Dinner");
         let reminderBody;
         for (let i = 0; i < 7; i++) {
            for (let j = 0; j < pillParams.frequency; j++) {
               reminderBody = j === 0 ? breakfastReminder : j === 1 ? lunchReminder : dinnerReminder;
               schedule[i].push(reminderBody);
            }
         }
      }
      else {
         const timeSpacing = (userTimes.sleepTime - userTimes.wakeupTime) / pillParams.frequency;
   
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
      if(context === "Food") {
         context = "Breakfast";
      } 
      let reminderBody = reminder.createReminder(context)
      let spacing = freqMap[pillParams.frequency - 1];
      for (let i = 0; i < spacing.length; i++) {
         schedule[0].push(reminderBody);
         schedule[4].push(reminderBody);
      }
   }

   return schedule;
} 

module.exports = {createSchedule, updateSchedule, deleteSchedule};
