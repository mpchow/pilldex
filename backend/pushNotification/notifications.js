const db = require('../db/db');
const Profile = db.User;
var firebase = require("firebase/app");
var admin = require('firebase-admin');

var serviceAccount = require("../firebaseServiceKey.json");

admin.initializeApp({
		  credential: admin.credential.cert(serviceAccount),
		  databaseURL: "https://pilldex.firebaseio.com"
});

const sendNotification = async (userParams, payload) => {
	console.log("About to Send Notification!");
	try {
		return admin.messaging().sendToDevice(userParams.token, payload).then(response =>{
			console.log("The Notification Has been Sent !");
		});
	}
	catch (error) {
		throw `Could not send notification`;
	}
}

module.exports = {sendNotification};
