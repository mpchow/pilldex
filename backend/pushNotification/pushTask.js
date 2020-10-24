//const sendNotification = require('./notifications');
const notifService = require('./notifications');
const db = require('../db/db');
const Profile = db.User;

const pushTask = async () => {
   const currHour = new Date().getHours();
   const currMin = new Date().getMinutes();
   const currDay = new Date().getDay();
   let profiles = await Profile.find({});
   
   (await profiles).forEach(profile => {
      profile.schedule[currDay].forEach((pill) => {
         if(pill.time.getHours() === currHour && pill.time.getMinutes() === currMin) {
            notifService.sendNotification(profile.token, `It is time to take ${reminder.name}`);
         }
      });
      
   });

}

module.exports = pushTask;
