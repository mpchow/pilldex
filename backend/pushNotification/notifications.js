/* Connects to the firebase messaging service to send notifications */

const db = require('../db/db');
const Profile = db.User;
var firebase = require("firebase/app");
var admin = require('firebase-admin');

var serviceAccount = require("../firebaseServiceKey.json");

// Initialize the firebase app 
admin.initializeApp({
		  credential: admin.credential.cert(serviceAccount),
		  databaseURL: "https://pilldex.firebaseio.com"
});

/*
 * Sends a notification to a user based on a unique token
 * userParams.token = unique token associated with each user
 * payload = message to be sent to the user
 */
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
