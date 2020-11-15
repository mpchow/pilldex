const pillRoute = require('./../routes/pills.js');
const mongoose = require('mongoose');
//jest.mock('./mocks/pill-mocks.js');

const app = require('../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

const testPillInvalidUser = {"userId":"invalidUserId", "name":"invalidUserPill", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
				  "withFood":true, "withSleep":false, "remaining":5};

const testPillValid= {"userId":"validUserId2", "name":"testPill", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
				  "withFood":true, "withSleep":false, "remaining":5};

const testPillInvalidName= {"userId":"validUserId2", "name":"invalidName", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
				  "withFood":true, "withSleep":false, "remaining":5};

const updatePill = {"userId":"validUserId2", "name":"testPill", "totalQuantity":999, "frequency":2, "frequencyUnit":"daily", "dosage":1,
				  "withFood":true, "withSleep":false, "remaining":5};

const testLabel = {"body":"Local Pharmacy RX# 0004921—39S CUSTOMER NAME GENERIC RX 500 MG TABLET\n TAKE ONE TABLET TWICE DAILY\n PRESCRIPTION NO. STORE NO.PRESCRIBED BY: A. DOCTOR QTY: 20 NO REFILLS REMAIN PRESCRIBER AUTH REQUIRED 123 RX AVENUE NEW YORK, NY NEW DATE FILLED: 02/05/2019 DISCARD BY: 02/05/2020 (555) 555 -555"};

const testLabel2 = {"body":"Local Pharmacy RX# 0004921—39S CUSTOMER NAME acetaminophen 500 MG TABLET\n TAKE ONE TABLET TWICE DAILY BEFORE BED WITH FOOD\n PRESCRIPTION NO. STORE NO.PRESCRIBED BY: A. DOCTOR QTY: 20 NO REFILLS REMAIN PRESCRIBER AUTH REQUIRED 123 RX AVENUE NEW YORK, NY NEW DATE FILLED: 02/05/2019 DISCARD BY: 02/05/2020 (555) 555 -555"};

const parsedLabel = {
        "name": null,
        "totalQuantity": 20,
        "frequency": 2,
        "frequencyUnit": "daily",
        "dosage": 1,
        "withFood": false,
        "withSleep": false
    };


// Expected error results
const userNotFound = {status: 404, msg: "User Not Found"};
const pillNotFound = {status: 404, msg: "Pill Not Found"};

// Integrated tests
describe("Create Pill Integrated Test", () => {
	it('Tests POST endpoint with invalid userId', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(testPillInvalidUser);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})

	it('Tests POST endpoint with valid userId', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(testPillValid);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Created Successfully');
		done();
	})

});

describe("Get Pills Integrated Test", () => {
	it('Tests GET endpoint with invalid userId', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.get('/pills?userId=invalidUserId');
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})

	it('Tests GET endpoint with valid userId', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.get('/pills?userId=validUserId2');
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Retrieved Pills Successfully');
		done();
	})
});

describe("Get Pill By ID Integrated Test", () => {
	it('Tests GET endpoint with invalid userId', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.get('/pills/?userId=invalidUserId&name=testPill');
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})

	it('Tests GET endpoint with invalid pillName', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.get('/pills/single?userId=validUserId2&name=invalidPillName');
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('Pill Not Found');
		done();
	})

	it('Tests Get endpoint with valid parameters', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.get('/pills/single?userId=validUserId2&name=testPill');
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Retrieved Pill Successfully');
		done();
	})
});

describe("Update Pill Integrated Test", () => {
	it('Tests PUT endpoint with invalid userId', async done => {
		// Sends DELETE Request to /pills endpoint
		const res = await request.put('/pills').send(testPillInvalidUser);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})
	it('Tests PUT endpoint with invalid pill', async done => {
		// Sends DELETE Request to /pills endpoint
		const res = await request.put('/pills').send(testPillInvalidName);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('Pill Not Found');
		done();
	})
	it('Tests PUT endpoint with valid userId', async done => {
		// Sends DELETE Request to /pills endpoint
		const res = await request.put('/pills').send(updatePill);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Updated Successfully');
		done();
	})
});

describe("Refill Pill Integrated Test", () => {
	it('Tests POST /refill endpoint with valid userId', async done => {
		// Sends DELETE Request to /pills endpoint
		const res = await request.post('/pills/refill').send(updatePill);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		done();
	})
	it('Tests POST /refill endpoint with valid userId', async done => {
		// Sends DELETE Request to /pills endpoint
		const res = await request.post('/pills/refill').send(testPillInvalidUser);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})
});

describe("Delete Pill Integrated Test", () => {
	it('Tests DELETE endpoint with invalid userId', async done => {
		// Sends DELETE Request to /pills endpoint
		const res = await request.delete('/pills?userId=invalidUserId&name=testPill');
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})
	it('Tests DELETE endpoint with invalid pillName', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills?userId=validUserId2&name=invalidName');
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('Pill Not Found');
		done();
	})
	it('Tests DELETE endpoint with valid parameters', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills?userId=validUserId2&name=testPill');
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
		done();
	})
});

describe("Parse Label Integration Test", () => {
	it('Tests Parsing of a label ', async done => {
		// Sends POST Request to /pills/label endpoint
		const res = await request.post('/pills/label').send(testLabel);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		expect(res.body.pillData).toStrictEqual(parsedLabel);
		done();
	})
	it('Tests Parsing of a label with additional conditions ', async done => {
		// Sends POST Request to /pills/label endpoint
		const res = await request.post('/pills/label').send(testLabel2);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		expect(res.body.pillData).toStrictEqual(parsedLabel);
		done();
	})
});

describe("User Dismisses Notification Integration Test", () => {
	it('Tests Pill Taken with valid userId', async done => {
		// Sends POST Request to /pills/taken endpoint
		const res = await request.post('/pills/taken').send(testPillValid);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Pill Updated Successfully');
		done();
	})

});

/*
describe("Get Pills Function", () => {
	// Testing MOCK FUNCTION
	// Tests that the pill is retreived 
	test('gets pill', () => {
		expect(mockRetrievePills({"userId":"testId"}).status).toBe(200);
		expect(mockRetrievePills({"userId":"testId"}).pills).toBe(testPill);
		expect(mockRetrievePills({"userId":"testId"}).msg).toBe("Retrieved Pills Successfully");
	});
	
	// Tests that an error is returned 
	test('Invalid getPills call', () => {
	 	expect(mockRetrievePills({"userId":"invalidId"})).toBe(userNotFound);
	});
});
*/
/*
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

*/

