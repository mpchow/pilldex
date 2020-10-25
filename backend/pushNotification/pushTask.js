//const sendNotification = require('./notifications');
const notifService = require('./notifications');
const db = require('../db/db');
const Profile = db.User;

const pushTask = async () => {
   const currTime = new Date();
   const currHour = new Date().getHours();
   const currMin = new Date().getMinutes();
   const currDay = new Date().getDay();
   let profiles = await Profile.find({});
   console.log('Have not entered the forEach yet');
   (await profiles).forEach(profile => {
      console.log(profile);
	  console.log("First foreach");
	  console.log(currHour);

      profile.schedule[currDay].forEach((pill) => {
  	     console.log('Entered the second forEach');
         if(pill.time.getHours() === currHour && pill.time.getMinutes() === currMin) {
			console.log('ITS TIME TO NOTIFY');
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
