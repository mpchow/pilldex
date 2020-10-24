const db = require('../db/db');
const Profile = db.User;

const pushTask = async () => {
   const currTime = new Date().getHours();
   const currDay = new Date().getDay();
   let profiles = await Profile.find({});
   (await profiles).forEach(profile => {
      profile.schedule.currDay.forEach((reminder) => {
         if(reminder.time === currTime) {
            //push the notification
         }
      });
      
   });

}

module.exports = pushTask;