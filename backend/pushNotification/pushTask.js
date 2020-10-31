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
         if(pill.time.reminderTime.getHours() === currHour && pill.time.reminderTime,getMinutes() === currMin && !pill.takenEarly) {
			const payload = {
				notification: {
					title: "Notification",
					body: `It is time to take ${pill.dosage} ${pill.pillName}`,
					priority: 'high',
				}
			 };
            notifService.sendNotification(profile, payload);
         }
      });
      
   });

}

module.exports = pushTask;
