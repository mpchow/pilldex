//const sendNotification = require('./notifications');
const notifService = require('./notifications');
const db = require('../db/db');
const Profile = db.User;

const pushTask = async () => {
   const currTime = new Date().getHours();
   const currDay = new Date().getDay();
   let profiles = await Profile.find({});
   
   (await profiles).forEach(profile => {
      profile.schedule[currDay].forEach((pill) => {
         if(pill.time.getHours() === currTime) {
            notifService.sendNotification(profile.token, `It is time to take ${reminder.name}`);
         }
      });
      
   });

}

module.exports = pushTask;
