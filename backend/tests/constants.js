let constants = {
	// Test Pill with Invalid UserId and Invalid Name
	testPillInvalidUser : {"userId":"invalidUserId", "name":"invalidUserPill", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":true, "withSleep":false, "remaining":5},
	
	// Test Pill with Invalid name but Valid UserId
	testPillInvalidName: {"userId":"validUserId2", "name":"invalidName", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":true, "withSleep":false, "remaining":5},

	// Test Pill with Valid UserId and Valid name
	testPillValid: {"userId":"validUserId2", "name":"testPill", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":true, "withSleep":false, "remaining":5},
	
	updatePill : {"userId":"validUserId2", "name":"testPill", "totalQuantity":999, "frequency":2, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":true, "withSleep":false, "remaining":5},

	// Test Pill Parameters for POST pills/taken requests
	takenPillInvalidUser: {"userId":"invalidUserId", "name":"invalidUserPill", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":true, "withSleep":false, "remaining":5, "timeTaken" : {"day":0, "hour":1, "min":10}},

	takenPillInvalidName : {"userId":"validUserId2", "name":"invalidName", "timeTaken" : {"day":0, "hour":1, "min":10}, "reminderId":"214e5249-a89e-473a-a554-609942a01b5f"},

	takenPillValid : {"userId":"validUserId2", "name":"testPill", "timeTaken" : {"day":0, "hour":1, "min":10}, "reminderId":"214e5249-a89e-473a-a554-609942a01b5f"},


	// Test Pills for testing ManageSchedule
	testPillFoodSleep: {"userId":"validUserId2", "name":"foodSleepPill", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":true, "withSleep":true, "remaining":5},

	testPillSleep: {"userId":"validUserId2", "name":"sleepPill", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":false, "withSleep":true, "remaining":5},

	testPillWeekly: {"userId":"validUserId2", "name":"weeklyPill", "totalQuantity":10, "frequency":2, "frequencyUnit":"weekly", "dosage":1,
	   			  "withFood":false, "withSleep":false, "remaining":5},

	testPillWeeklyFood: {"userId":"validUserId2", "name":"weeklyPillFood", "totalQuantity":10, "frequency":2, "frequencyUnit":"weekly", "dosage":1,
	   			  "withFood":true, "withSleep":false, "remaining":5},

	testPillFoodSleep2: {"userId":"greaterThanUser", "name":"foodSleepPill2", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":true, "withSleep":true, "remaining":5},

	testPillSleep2: {"userId":"greaterThanUser", "name":"sleepPill2", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":false, "withSleep":true, "remaining":5},

	testPillWeekly2: {"userId":"greaterThanUser", "name":"weeklyPill2", "totalQuantity":10, "frequency":2, "frequencyUnit":"weekly", "dosage":1,
	   			  "withFood":false, "withSleep":false, "remaining":5},

	testPillFood3Gt: {"userId":"greaterThanUser", "name":"food3gt", "totalQuantity":10, "frequency":3, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":true, "withSleep":false, "remaining":5},

	testPillFood3Lt: {"userId":"validUserId2", "name":"food3lt", "totalQuantity":10, "frequency":3, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":true, "withSleep":false, "remaining":5},

	testPillDaily: {"userId":"validUserId2", "name":"dailyNoFoodSleep", "totalQuantity":10, "frequency":3, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":false, "withSleep":false, "remaining":5},
	testPillDaily2: {"userId":"greaterThanUser", "name":"dailyNoFoodSleep2", "totalQuantity":10, "frequency":3, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":false, "withSleep":false, "remaining":5},
	testPillEvening: {"userId":"eveningUser", "name":"eveningUserPill", "totalQuantity":10, "frequency":3, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":false, "withSleep":false, "remaining":5},
	testPill12AM: {"userId":"12AMUser", "name":"12AMUserPill", "totalQuantity":10, "frequency":3, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":false, "withSleep":false, "remaining":5},

	// Test Labels for integration testing
	testLabel : {"body":"1 Local Pharmacy 0004921—39S RX 500 MG TABLET\n TAKE ONE TABLET TWICE DAILY\n QTY: 20 NO REFILLS REMAIN 123 RX AVENUE NEW YORK DISCARD BY: 02/05/2020 (555) 555 -555 five"},
	testLabel2 : {"body":"82 ACETAMINOPHEN 500 MG TABLET\n TAKE ONE TABLET TWICE DAILY BEFORE BED WITH FOOD\n 123 RX AVENUE NEW YORK, NY 555"},
	testLabel3 : {"body":"1 0004921—39S five ACETAMINOPHEN 500 MG TABLET\n TAKE ONE TABLET TWICE DAILY BEFORE BED WITH FOOD\n "},
	testLabel4: {"body":"ONE RX 500 MG TABLET\n TAKE 1 TABLET 2 TIMES WEEKLY\n QTY: FIVE BY: TIMES"},
	testLabel5: {"body":"1 TAKE 1 TABLET TWO TIMES WEEKLY\n QTY: FIVE NO 555 TAKE"},
	testLabel6 : {"body":"ACETAMINOPHEN 1 Local QTY: 5 500 MG TABLET\n TAKE ONE TABLET TWICE DAILY BEFORE BED WITH FOOD\n QTY"},

	// Test Labels for Label Unit Testing
	testLabelName : {"body":"ACETAMINOPHEN"},
	testLabelMixName: {"body":"ACeTaMInOpheN"},
	testLabelQty : {"body":"QTY: 10"},
	testLabelFreqUnit : {"body":"daily"},
	testLabelMixFreq: {"body":"dAIlY"},
	testLabelConditions : {"body":"sleep food"},
	testLabelMixConditions : {"body":"SleEP fOoD"},
	testLabelSleep: {"body":"sleep"},
	testLabelEat: {"body":"food"},
	testLabelDosage : {"body":"2"},
	testLabelFreq: {"body":"once"},
	testLabelNQ1: {"body":"10 ACETAMINOPHEN"},
	testLabelNQ2: {"body":"TEN ACETAMINOPHEN"},
	testLabelAll1: {"body":"10 ACETAMINOPHEN TAKE 2 ONCE DAILY WITH FOOD AND SLEEP"},
	testLabelAll2: {"body":"TEN ACETAMINOPHEN TAKE TWO 1 TIME DAILY WITH FOOD AND SLEEP"},
	testLabelNL: {"body":"10 ACETAMINOPHEN\n TAKE \n 2 \nONCE DAILY\n WITH \n FOOD AND SLEEP"},
	testLabelSpace : {"body":"10      ACETAMINOPHEN    TAKE      2 ONCE DAILY WITH FOOD AND    SLEEP"},
	testLabelBounds: {"body":"TEN ACETAMINOPHEN TAKE TWO 1 TIME DAILY WITH FOOD AND SLEEP QTY"},
	testLabelNone: {"body":"PRESCRIBED ** BY A DOCTOR WITHIN 8 MINUTES YOU MAY NEED TO CALL"},
	
	// Parsed Label results for Label Unit Testing
	parsedLabelName : {
	        "name": "acetaminophen",
	        "totalQuantity": null,
	        "frequency": null,
	        "frequencyUnit": null,
	        "dosage": null, 
	        "withFood": false,
	        "withSleep": false 
	},

	parsedLabelQty : {
	        "name": null,
	        "totalQuantity": 10,
	        "frequency": null,
	        "frequencyUnit": null,
	        "dosage": null, 
	        "withFood": false,
	        "withSleep": false 
	},

	parsedLabelFreqUnit : {
	        "name": null,
	        "totalQuantity": null,
	        "frequency": null,
	        "frequencyUnit": "daily",
	        "dosage": null, 
	        "withFood": false,
	        "withSleep": false 
	},

	parsedLabelConditions: {
	        "name": null,
	        "totalQuantity": null,
	        "frequency": null,
	        "frequencyUnit": null,
	        "dosage": null, 
	        "withFood": true,
	        "withSleep": true 
	},

	parsedLabelSleep: {
	        "name": null,
	        "totalQuantity": null,
	        "frequency": null,
	        "frequencyUnit": null,
	        "dosage": null, 
	        "withFood": false,
	        "withSleep": true 
	},

	parsedLabelEat: {
	        "name": null,
	        "totalQuantity": null,
	        "frequency": null,
	        "frequencyUnit": null,
	        "dosage": null, 
	        "withFood": true,
	        "withSleep": false 
	},

	parsedLabelDosage : {
	        "name": null,
	        "totalQuantity": null,
	        "frequency": null,
	        "frequencyUnit": null,
	        "dosage": 2, 
	        "withFood": false,
	        "withSleep": false 
	},

	parsedLabelFreq : {
	        "name": null,
	        "totalQuantity": null,
	        "frequency": 1,
	        "frequencyUnit": null,
	        "dosage": null, 
	        "withFood": false,
	        "withSleep": false 
	},

	parsedLabelNQ1: {
	        "name": "acetaminophen",
	        "totalQuantity": 10,
	        "frequency": null,
	        "frequencyUnit": null,
	        "dosage": null, 
	        "withFood": false,
	        "withSleep": false 
	},

	parsedLabelNQ2: {
	        "name": "acetaminophen",
	        "totalQuantity": 10,
	        "frequency": null,
	        "frequencyUnit": null,
	        "dosage": null, 
	        "withFood": false,
	        "withSleep": false 
	},

	parsedLabelAll: {
	        "name": "acetaminophen",
	        "totalQuantity": 10,
	        "frequency": 1,
	        "frequencyUnit": "daily",
	        "dosage": 2,
	        "withFood": true,
	        "withSleep": true 
	},

	parsedLabelNull : {
	        "name": null,
	        "totalQuantity": null,
	        "frequency": null,
	        "frequencyUnit": null,
	        "dosage": null,
	        "withFood": false,
	        "withSleep": false 
	},

	parsedLabel : {
	        "name": null,
	        "totalQuantity": 20,
	        "frequency": 2,
	        "frequencyUnit": "daily",
	        "dosage": 1,
	        "withFood": false,
	        "withSleep": false
	},

	parsedLabel2 : {
	        "name": "acetaminophen",
	        "totalQuantity": 82,
	        "frequency": 2,
	        "frequencyUnit": "daily",
	        "dosage": 1,
	        "withFood": true,
	        "withSleep": true 
	},

	parsedLabel3 : {
	        "name": "acetaminophen", 
	        "totalQuantity": 5,
	        "frequency": 2,
	        "frequencyUnit": "daily",
	        "dosage": 1,
	        "withFood": true,
	        "withSleep": true 
	},
	parsedLabel4 : {
	        "name": null,
	        "totalQuantity": 5,
	        "frequency": 2,
	        "frequencyUnit": "weekly",
	        "dosage": 1,
	        "withFood": false,
	        "withSleep": false 
	},

	// Expected error results
	userNotFound : {status: 404, msg: "User Not Found"},
	pillNotFound : {status: 404, msg: "Pill Not Found"},

	// Test Users for User Integration Tests:
	initialUser : {"token":"testToken", "userId":"validUserId2", "wakeupHr":1, "wakeupMin":10, "wakeupAM":true, "wakeupPM":false, "sleepHr":11, "sleepMin":10, "sleepAM":true, "sleepPM":false,
					 "breakfastHr":3, "breakfastMin":30, "breakfastAM":true, "breakfastPM":false, "lunchHr":5, "lunchMin":0, "lunchAM":true, "lunchPM":false, "dinnerHr":7, "dinnerMin":15,
					 "dinnerAM":true, "dinnerPM":false, "schedule":[[], [], [], [], [], [], []]}, 

	greaterThanUser : {"token":"testToken", "userId":"greaterThanUser", "wakeupHr":1, "wakeupMin":10, "wakeupAM":true, "wakeupPM":false, "sleepHr":11, "sleepMin":10, "sleepAM":false, "sleepPM":true,
					 "breakfastHr":6, "breakfastMin":30, "breakfastAM":true, "breakfastPM":false, "lunchHr":10, "lunchMin":0, "lunchAM":true, "lunchPM":false, "dinnerHr":2, "dinnerMin":20,
					 "dinnerAM":false, "dinnerPM":true, "schedule":[[], [], [], [], [], [], []]}, 

	eveningUser : {"token":"testToken", "userId":"eveningUser", "wakeupHr":11, "wakeupMin":10, "wakeupAM":false , "wakeupPM":true, "sleepHr":11, "sleepMin":10, "sleepAM":false, "sleepPM":true,
					 "breakfastHr":11, "breakfastMin":30, "breakfastAM":false, "breakfastPM":true, "lunchHr":11, "lunchMin":0, "lunchAM":false, "lunchPM":true, "dinnerHr":11, "dinnerMin":20,
					 "dinnerAM":false, "dinnerPM":true, "schedule":[[], [], [], [], [], [], []]}, 

	AMuser : {"token":"testToken", "userId":"12AMUser", "wakeupHr":12, "wakeupMin":10, "wakeupAM":true , "wakeupPM":false , "sleepHr":11, "sleepMin":10, "sleepAM":false, "sleepPM":true,
					 "breakfastHr":11, "breakfastMin":30, "breakfastAM":false, "breakfastPM":true, "lunchHr":11, "lunchMin":0, "lunchAM":false, "lunchPM":true, "dinnerHr":11, "dinnerMin":20,
					 "dinnerAM":false, "dinnerPM":true, "schedule":[[], [], [], [], [], [], []]}, 

	newUser : {"token":"testToken", "userId":"validUserId", "wakeupHr":12, "wakeupMin":10, "wakeupAM":false, "wakeupPM":true, "sleepHr":10, "sleepMin":10, "sleepAM":false, "sleepPM":true,
					 "breakfastHr":10, "breakfastMin":30, "breakfastAM":true, "breakfastPM":false, "lunchHr":12, "lunchMin":0, "lunchAM":false, "lunchPM":true, "dinnerHr":7, "dinnerMin":15,
					 "dinnerAM":false, "dinnerPM":true, "schedule":[[], [], [], [], [], [], []]}, 
	
	updateUserValid : {"token":"testToken", "userId":"validUserId", "wakeupHr":12, "wakeupMin":50, "wakeupAM":false, "wakeupPM":true, "sleepHr":10, "sleepMin":10, "sleepAM":false, "sleepPM":true,
					 "breakfastHr":10, "breakfastMin":30, "breakfastAM":true, "breakfastPM":false, "lunchHr":12, "lunchMin":0, "lunchAM":false, "lunchPM":true, "dinnerHr":7, "dinnerMin":15,
					 "dinnerAM":false, "dinnerPM":true, "schedule":[[], [], [], [], [], [], []] 
					 },
	
	updateUserInvalid : {"token":"testToken", "userId":"invalidUserId", "wakeupHr":8, "wakeupMin":50, "wakeupAM":true, "wakeupPM":false, "sleepHr":10, "sleepMin":10, "sleepAM":false }

}

module.exports = Object.freeze(constants);
