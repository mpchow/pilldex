let constants = {

	testPillInvalidUser : {"userId":"invalidUserId", "name":"invalidUserPill", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":true, "withSleep":false, "remaining":5},
	
	testPillValid: {"userId":"validUserId2", "name":"testPill", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":true, "withSleep":false, "remaining":5},
	
	testPillInvalidName: {"userId":"validUserId2", "name":"invalidName", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":true, "withSleep":false, "remaining":5},
	
	updatePill : {"userId":"validUserId2", "name":"testPill", "totalQuantity":999, "frequency":2, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":true, "withSleep":false, "remaining":5},

	takenPillInvalidUser: {"userId":"invalidUserId", "name":"invalidUserPill", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
	   			  "withFood":true, "withSleep":false, "remaining":5, "timeTaken" : {"day":0, "hour":1, "min":10}},

	takenPillValid : {"userId":"validUserId2", "name":"testPill", "timeTaken" : {"day":0, "hour":1, "min":10}, "reminderId":"214e5249-a89e-473a-a554-609942a01b5f"},

	takenPillInvalidName : {"userId":"validUserId2", "name":"invalidName", "timeTaken" : {"day":0, "hour":1, "min":10}, "reminderId":"214e5249-a89e-473a-a554-609942a01b5f"},
	
	testLabel : {"body":"1 Local Pharmacy RX# 0004921—39S CUSTOMER NAME GENERIC RX 500 MG TABLET\n TAKE ONE TABLET TWICE DAILY\n PRESCRIPTION NO. STORE NO.PRESCRIBED BY: A. DOCTOR QTY: 20 NO REFILLS REMAIN PRESCRIBER AUTH REQUIRED 123 RX AVENUE NEW YORK, NY NEW DATE FILLED: 02/05/2019 DISCARD BY: 02/05/2020 (555) 555 -555 five"},
	
	testLabel2 : {"body":"ONE Local Pharmacy RX# 0004921—39S 82 ACETAMINOPHEN 500 MG TABLET\n TAKE ONE TABLET TWICE DAILY BEFORE BED WITH FOOD\n PRESCRIPTION NO. STORE NO.PRESCRIBED BY: A. DOCTOR REMAIN PRESCRIBER AUTH REQUIRED 123 RX AVENUE NEW YORK, NY NEW DATE FILLED: 02/05/2019 DISCARD BY: 02/05/2020 (555) 555 -555"},
	
	testLabel3 : {"body":"1 Local Pharmacy RX# 0004921—39S five ACETAMINOPHEN 500 MG TABLET\n TAKE ONE TABLET TWICE DAILY BEFORE BED WITH FOOD\n PRESCRIPTION NO. STORE NO.PRESCRIBED BY: A. DOCTOR REMAIN PRESCRIBER AUTH REQUIRED 123 RX AVENUE NEW YORK, NY NEW DATE FILLED: 02/05/2019 DISCARD BY: 02/05/2020 (555) 555 -555"},
	
	testLabel4: {"body":"ONE Local Pharmacy RX# 0004921—39S CUSTOMER NAME GENERIC RX 500 MG TABLET\n TAKE 1 TABLET 2 TIMES WEEKLY\n PRESCRIPTION NO. STORE NO.PRESCRIBED BY: A. DOCTOR QTY: FIVE NO REFILLS REMAIN PRESCRIBER AUTH REQUIRED 123 RX AVENUE NEW YORK, NY NEW DATE FILLED: 02/05/2019 DISCARD BY: TIMES"},

	testLabel5: {"body":"1 Local Pharmacy RX# 0004921—39S CUSTOMER NAME GENERIC RX 500 MG TABLET\n TAKE 1 TABLET TWO TIMES WEEKLY\n PRESCRIPTION NO. STORE NO.PRESCRIBED BY: A. DOCTOR QTY: FIVE NO REFILLS REMAIN PRESCRIBER AUTH REQUIRED 123 RX AVENUE NEW YORK, NY NEW DATE FILLED: 02/05/2019 DISCARD BY: 02/05/2020 (555) 555 -555 TAKE"},

	testLabel6 : {"body":"ACETAMINOPHEN 1 Local Pharmacy RX# 0004921—39S QTY: 5 500 MG TABLET\n TAKE ONE TABLET TWICE DAILY BEFORE BED WITH FOOD\n PRESCRIPTION NO. STORE NO.PRESCRIBED BY: A. DOCTOR REMAIN PRESCRIBER AUTH REQUIRED 123 RX AVENUE NEW YORK, NY NEW DATE FILLED: 02/05/2019 DISCARD BY: 02/05/2020 (555) 555 -555 QTY"},

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

	parsedLabelName : {
	        "name": "acetaminophen",
	        "totalQuantity": null,
	        "frequency": null,
	        "frequencyUnit": null,
	        "dosage": null, 
	        "withFood": null,
	        "withSleep": null 
	},

	// Expected error results
	userNotFound : {status: 404, msg: "User Not Found"},
	pillNotFound : {status: 404, msg: "Pill Not Found"}
}

module.exports = Object.freeze(constants);
