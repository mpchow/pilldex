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
			const payload = {
				notification: {
					title: "Testing pushtask Function!",
					body: `It is time to take ${pill.pillName}`,
					priority: 'high',
				}
			 };
            notifService.sendNotification(profile, payload);
         }
      });
      
   });

}

module.exports = pushTask;
