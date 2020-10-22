const db = require('../db/db');
const Profile = db.User;
var firebase = require("firebase/app");
var admin = require('firebase-admin');

var firebaseConfig = {
  "project_info": {
    "project_number": "36855760333",
    "firebase_url": "https://pilldex.firebaseio.com",
    "project_id": "pilldex",
    "storage_bucket": "pilldex.appspot.com"
  },
  "client": [
    {
      "client_info": {
        "mobilesdk_app_id": "1:36855760333:android:838a8ae06464c62b417084",
        "android_client_info": {
          "package_name": "com.pilldex"
        }
      },
      "oauth_client": [
        {
          "client_id": "36855760333-mvit8m949smh3our3siua8gb21mmck6k.apps.googleusercontent.com",
          "client_type": 3
        }
      ],
      "api_key": [
        {
          "current_key": "AIzaSyAXjHS6mNxxexC-Uvj8p-kYkQ2DOD_aDPI"
        }
      ],
      "services": {
        "appinvite_service": {
          "other_platform_oauth_client": [
            {
              "client_id": "36855760333-mvit8m949smh3our3siua8gb21mmck6k.apps.googleusercontent.com",
              "client_type": 3
            }
          ]
        }
      }
    }
  ],
  "configuration_version": "1"
};

const messaging = firebase.messaging();

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const sendNotification = async (message) => {
	const messageString = JSON.stringify(data)

    const headers = {
        'Authorization': 'key=<AAAACJTGRc0:APA91bHk_eOAhLdm_u5zz9dJdRqsd4eBwlkRpAp3bBKWMrc4dbrFlh-8ubz79qRkqCpj95uNk60ADgU9aGFR1roe7wqt3EJclqS8of0-NGWMRBSwSo48kFg04Y3MxAinQhibuACTB2JP>',
        'Content-Type': 'application/json',
        'Content-Length': messageString.length
    }

    const options = {
        uri: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: headers,
        json: data
    }

    request(options, function (err, res, body) {
        if (err) throw err
        else console.log(body)
    })
}


