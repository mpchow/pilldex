const db = require('../db/db');
const Pills = db.Pill;
const Users = db.User;
const NormalDistribution = require('normal-distribution');
const pill = require('../modules/pill');
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

   let pillReminder = schedule[timeTaken.getDay()].find(reminders => reminders.reminderId === reminderId);

   let timeTakenConverted = timeTaken.getHours() * 60 + timeTaken.getMinutes();
   let reminderTimeConverted = pillReminder.time.reminderTime.getHours() * 60 + pillReminder.time.reminderTime.getMinutes();

   let timeDiff = Math.abs(timeTakenConverted - reminderTimeConverted);

   if (timeDiff > 30) {
      pillReminder.timesLate++;
      if(pillReminder.timesLate === 2) {
         pillReminder.timesLate = 0;
         pillReminder.takenEarly = false;

         let newTime = 0;
         for(let time in  pillReminder.adjustedTimes) {
            newTime += time;
         }
         newTime /= pillReminder.adjustedTimes.length;
         pillReminder.time.reminderTime = new Date(2020, 10, Math.floor(newTime/60) + 7 > 24 ? timeTaken.getDay() + 2 : timeTaken.getDay() + 1, newTime % 60);
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

const deleteSchedule = (user, pill) => {
   let schedule = user.schedule;

   schedule = schedule.map(day => {
      return day.filter(reminder => {
         reminder.pillName !== pill.name;
      })
   });

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
