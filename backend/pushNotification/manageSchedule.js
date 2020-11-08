const db = require('../db/db');
const Pills = db.Pill;
const Users = db.User;
const NormalDistribution = require('normal-distribution');
const pill = require('../modules/pill');
const dist = new NormalDistribution.default();
const reminderFactory = require('./reminderFactory');


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
 
const updateSchedule = async (reqBody) => {
   let user = await Users.findOne({userId: reqBody.userId});
   let schedule = user.schedule;

   const pill = await Pills.findOne({name: reqBody.pillName});
   await Pills.findOneAndUpdate({name: reqBody.pillName}, {remaining: pill.remaining - pill.dosage});

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
   
      await Users.findOneAndUpdate({userId: user.userId}, {schedule: schedule});

   } 
   return ({msg: "Schedule Updated"});
}

const deleteSchedule = async (userId, pill) => {
   let user = await Users.findOne({userId: userId});
   let schedule = user.schedule;

   schedule = schedule.map(day => {
      return day.filter(reminder => {
         reminder.pillName !== pill.name;
      })
   });

  await Users.findOneAndUpdate({userId: userId}, {schedule: schedule});
};

const createSchedule = async (pillParams) => {
   let user = await Users.findOne({userId: pillParams.userId});
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
   
   let reminder = new reminderFactory(pillParams, user, userTimes);

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

   await Users.findOneAndUpdate({userId: pillParams.userId}, {schedule: schedule});
} 

module.exports = {createSchedule, updateSchedule, deleteSchedule};
