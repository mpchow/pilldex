const db = require('../db/db');
const Pills = db.Pill;
const Users = db.User;

const getDate = (day, pill, user) => {
   if (pill.withFood) {
      return new Date(2020, 10, day + 1, user.lunchHour, user.lunchMin);
   }
   else if (pill.withSleep) {
      return new Date(2020, 10, day + 1, user.sleepHour, user.sleepMin);
   }
   else {
      return new Date(2020, 10, day + 1, user.lunchHour + 2);
   }
};
 
const updateSchedule = (userID, pill) => {
   let user = Users.find({userId: userID});
   let schedule = user.schedule;
   
   for (let i = 0; i < 7; i += pill.frequency) {
      schedule[i].push({time: getDate(i, pill, user), pillName: pill.name});
   }
   
   Users.findOneAndUpdate({userId: userID}, {schedule: schedule,...user});
}

const deleteSchedule = (userID, pill) => {
   let user = Users.find({userId: userID});
   let schedule = user.schedule;

   schedule.forEach(day => {
      day.filter(reminder => {
         reminder.pillName !== pill.name;
      })
   })

   Users.findOneAndUpdate({userId: userID}, {schedule: schedule,...user});
};

const createSchedule = (userID) => {
   //iterate through all of the pills
   let pills = Pills.find({userId: userID});
   let user = Users.find({userId: userID});
   let schedule = [[], [], [], [], [], [], []];

   pills.forEach(pill => {
      //Get when we need to take the pill
      //Check frequency and whether we take it at night or with food
      for (let i = 0; i < 7; i += pill.frequency) {
         schedule[i].push({time: getDate(i, pill, user), pillName: pill.name});
      }
   });


   //Later have to update the user entry in the db
   Users.findOneAndUpdate({userId: userID}, {schedule: schedule,...user});
} 

module.exports = {createSchedule, updateSchedule, deleteSchedule};