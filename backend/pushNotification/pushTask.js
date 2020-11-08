const notifService = require('./notifications');
const db = require('../db/db');
const Profile = db.User;
const Pill = db.Pill;

const pushTask = async () => {
   const currHour = new Date().getHours() > 7 ? new Date().getHours() - 8 : 24 - (8 - new Date().getHours());
   const currMin = new Date().getMinutes();
   const currDay = currHour < 8 ? new Date().getDay() - 1 : new Date().getDay();
   let profiles = await Profile.find({});
   (await profiles).forEach(async profile => {
      (await profile.schedule[currDay]).forEach(async (pill) => {
         if(pill.time.reminderTime.hour === currHour && pill.time.reminderTime.minute === currMin && !pill.takenEarly) {
            const currPill = await Pill.findOne({name: pill.pillName});
            let payload;
            if(currPill.remaining < 1) {
               payload = {
                  notification: {
                     title: "Notification",
                     body: `You have run out of ${pill.pillName}`,
                     priority: 'high',
                  }
               }
            }
            else {
               payload = {
                  notification: {
                     title: "Notification",
                     body: `It is time to take ${pill.dosage} ${pill.pillName}`,
                     reminderId: pill.reminderId,
                     priority: 'high',
                  }
               };
            }
            notifService.sendNotification(profile, payload);
         }
      });
      
   });

}

module.exports = pushTask;
