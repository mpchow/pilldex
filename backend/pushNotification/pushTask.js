//const sendNotification = require('./notifications');
const notifService = require('./notifications');
const db = require('../db/db');
const Profile = db.User;

const pushTask = async () => {
   const currHour = new Date().getHours();
   const currMin = new Date().getMinutes();
   const currDay = (currHour >= 0 && currHour < 7) ? new Date().getDay() - 1 : new Date().getDay();
   let profiles = await Profile.find({});
   (await profiles).forEach(profile => {
   profile.schedule[currDay].forEach((pill) => {
         if(pill.time.getHours() === currHour && pill.time.getMinutes() === currMin) {
			const payload = {
				notification: {
					title: "Testing pushtask Function!",
					body: `It is time to take ${pill.pillName}`,
					priority: 'high',
				}
			 };
			console.log("Sending notification");
            notifService.sendNotification(profile, payload);
         }
      });
      
   });

}

module.exports = pushTask;
