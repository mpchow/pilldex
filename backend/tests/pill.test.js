const Constants = require('./constants.js');
const mongoose = require('mongoose');

const app = require('../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

const init = async() => {return await request.post('/users').send(Constants.initialUser)};

// Integrated tests

// Test Creating Pills (Generic Functionality)
describe("Create Pill Integrated Test", () => {
	beforeAll( async function() {
		await request.post('/users').send(Constants.initialUser);
		await request.post('/users').send(Constants.greaterThanUser);
		await request.post('/users').send(Constants.eveningUser);
		await request.post('/users').send(Constants.AMuser);
    });	

	it('Tests POST endpoint with invalid userId', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(Constants.testPillInvalidUser);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})

	it('Tests POST endpoint with valid userId', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(Constants.testPillValid);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Created Successfully');
		done();
	})

});

// Test Getting All User's Pills
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

// Test Getting single Pill
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

// Test updateTaken (Generic Functionality) 
describe("User Dismisses Notification Integration Test", () => {
	it('Tests Pill Taken with valid userId', async done => {
		// Sends POST Request to /pills/taken endpoint
		const res = await request.post('/pills/taken').send(Constants.takenPillValid);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Pill Updated Successfully');
		done();
	})
	it('Tests Pill Taken with invalid userId', async done => {
		// Sends POST Request to /pills/taken endpoint
		const res = await request.post('/pills/taken').send(Constants.takenPillInvalidUser);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})
	it('Tests Pill Taken with invalid pillName', async done => {
		// Sends POST Request to /pills/taken endpoint
		const res = await request.post('/pills/taken').send(Constants.takenPillInvalidName);
		expect(res.body.msg).toBe('Pill Not Found');
		done();
	})
});

// Test Updating Pill
describe("Update Pill Integrated Test", () => {
	it('Tests PUT endpoint with invalid userId', async done => {
		// Sends DELETE Request to /pills endpoint
		const res = await request.put('/pills').send(Constants.testPillInvalidUser);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})
	it('Tests PUT endpoint with invalid pill', async done => {
		// Sends DELETE Request to /pills endpoint
		const res = await request.put('/pills').send(Constants.testPillInvalidName);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('Pill Not Found');
		done();
	})
	it('Tests PUT endpoint with valid userId', async done => {
		// Sends DELETE Request to /pills endpoint
		const res = await request.put('/pills').send(Constants.updatePill);
		expect(res.body.msg).toBe('Pill Updated Successfully');
		done();
	})
});

// Test refilling prescription
describe("Refill Pill Integrated Test", () => {
	it('Tests POST /refill endpoint with valid userId', async done => {
		// Sends DELETE Request to /pills endpoint
		const res = await request.post('/pills/refill').send(Constants.updatePill);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		done();
	})
	it('Tests POST /refill endpoint with invalid userId', async done => {
		// Sends DELETE Request to /pills endpoint
		const res = await request.post('/pills/refill').send(Constants.testPillInvalidUser);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})
	it('Tests POST /refill endpoint with invalid name', async done => {
		// Sends DELETE Request to /pills endpoint
		const res = await request.post('/pills/refill').send(Constants.testPillInvalidName);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('Pill Not Found');
		done();
	})
});

// Test deleting a pill
describe("Delete Pill Integrated Test", () => {
	it('Tests DELETE endpoint with invalid userId', async done => {
		// Sends DELETE Request to /pills endpoint
		const res = await request.delete('/pills').send(Constants.testPillInvalidUser);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})
	it('Tests DELETE endpoint with invalid pillName', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills').send(Constants.testPillInvalidName);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('Pill Not Found');
		done();
	})
	it('Tests DELETE endpoint with valid parameters', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills').send(Constants.updatePill);
		expect(res.status).toBe(200);
//		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
		done();
	})
});

// Test parsing label
describe("Parse Label Integration Test", () => {
	it('Tests POST /label with null label', async done => {
		// Sends POST Request to /pills/label endpoint
		const res = await request.post('/pills/label').send(null)
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		expect(res.body.pillData).toStrictEqual(Constants.parsedLabelNull);
		done();
	})
	it('Tests POST /label with an empty label ', async done => {
		// Sends POST Request to /pills/label endpoint
		const res = await request.post('/pills/label').send({"body":""})
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		expect(res.body.pillData).toStrictEqual(Constants.parsedLabelNull);
		done();
	})
	it('Tests POST /label with a null body label ', async done => {
		// Sends POST Request to /pills/label endpoint
		const res = await request.post('/pills/label').send({"body":null})
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		expect(res.body.pillData).toStrictEqual(Constants.parsedLabelNull);
		done();
	})
	it('Tests POST /label with default sleep/eat', async done => {
		// Sends POST Request to /pills/label endpoint
		const res = await request.post('/pills/label').send(Constants.testLabel);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		expect(res.body.pillData).toStrictEqual(Constants.parsedLabel);
		done();
	})
	it('Tests POST /label with non-default sleep/eat', async done => {
		// Sends POST Request to /pills/label endpoint
		const res = await request.post('/pills/label').send(Constants.testLabel2);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		expect(res.body.pillData).toStrictEqual(Constants.parsedLabel2);
		done();
	})
	it('Tests POST /label with digits', async done => {
		// Sends POST Request to /pills/label endpoint
		const res = await request.post('/pills/label').send(Constants.testLabel3);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		expect(res.body.pillData).toStrictEqual(Constants.parsedLabel3);
		done();
	})
	it('Tests POST /label with word numbers', async done => {
		// Sends POST Request to /pills/label endpoint
		const res = await request.post('/pills/label').send(Constants.testLabel4);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		expect(res.body.pillData).toStrictEqual(Constants.parsedLabel4);
		done();
	})
	it('Tests POST /label with signal words at bound index', async done => {
		// Sends POST Request to /pills/label endpoint
		const res = await request.post('/pills/label').send(Constants.testLabel5);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		expect(res.body.pillData).toStrictEqual(Constants.parsedLabel4);
		done();
	})
	it('Tests POST /label with signal words at bound index', async done => {
		// Sends POST Request to /pills/label endpoint
		const res = await request.post('/pills/label').send(Constants.testLabel6);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		expect(res.body.pillData).toStrictEqual(Constants.parsedLabel3);
		done();
	})
});

// Testing ManageSchedule - Creating a pill with varying conditions will generate
// different schedules
describe("Test Creating Pill with Varying Conditions", () => {
	// ============== Testing with User with Hour Differences < 4 =============
	it('Tests POST endpoint with pill requiring Food And Sleep', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(Constants.testPillFoodSleep);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Created Successfully');
		done();
	})
	// Delete the pill so next time tests are run, pill already exists error will not occur
	it('Tests DELETE endpoint with valid parameters', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills').send(Constants.testPillFoodSleep);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
		done();
	})
	it('Tests POST endpoint with pill requiring Only Sleep', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(Constants.testPillSleep);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Created Successfully');
		done();
	})
	// Delete the pill so next time tests are run, pill already exists error will not occur
	it('Tests DELETE endpoint with valid parameters', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills').send(Constants.testPillSleep);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
		done();
	})

	it('Tests POST endpoint with hours < 4 apart with food', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(Constants.testPillFood3Lt);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Created Successfully');
		done();
	})
	// Delete the pill so next time tests are run, pill already exists error will not occur
	it('Tests DELETE endpoint with valid parameters', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills').send(Constants.testPillFood3Lt);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
		done();
	})

	it('Tests POST endpoint with weekly pill without food', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(Constants.testPillWeekly);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Created Successfully');
		done();
	})
	// Delete the pill so next time tests are run, pill already exists error will not occur
	it('Tests DELETE endpoint with valid parameters', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills').send(Constants.testPillWeekly);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
		done();
	})

	it('Tests POST endpoint with daily and no food or sleep', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(Constants.testPillDaily);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Created Successfully');
		done();
	})
	// Delete the pill so next time tests are run, pill already exists error will not occur
	it('Tests DELETE endpoint with valid parameters', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills').send(Constants.testPillDaily);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
		done();
	})
	

	// =========== Testing With User with Hour differences >= 4 ================
	it('Tests POST endpoint with pill requiring Food And Sleep', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(Constants.testPillFoodSleep2);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Created Successfully');
		done();
	})
	// Delete the pill so next time tests are run, pill already exists error will not occur
	it('Tests DELETE endpoint with valid parameters', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills').send(Constants.testPillFoodSleep2);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
		done();
	})
	it('Tests POST endpoint with pill requiring Only Sleep', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(Constants.testPillSleep2);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Created Successfully');
		done();
	})
	// Delete the pill so next time tests are run, pill already exists error will not occur
	it('Tests DELETE endpoint with valid parameters', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills').send(Constants.testPillSleep2);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
		done();
	})
	it('Tests POST endpoint with hours > 4 apart', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(Constants.testPillWeekly2);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Created Successfully');
		done();
	})
	// Delete the pill so next time tests are run, pill already exists error will not occur
	it('Tests DELETE endpoint with valid parameters', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills').send(Constants.testPillWeekly2);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
		done();
	})
	it('Tests POST endpoint with hours > 4 apart with food', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(Constants.testPillFood3Gt);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Created Successfully');
		done();
	})
	// Delete the pill so next time tests are run, pill already exists error will not occur
	it('Tests DELETE endpoint with valid parameters', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills').send(Constants.testPillFood3Gt);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
		done();
	})
	it('Tests POST endpoint with weekly and food', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(Constants.testPillWeeklyFood);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Created Successfully');
		done();
	})
	// Delete the pill so next time tests are run, pill already exists error will not occur
	it('Tests DELETE endpoint with valid parameters', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills').send(Constants.testPillWeeklyFood);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
		done();
	})
	it('Tests POST endpoint with daily and no food or sleep', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(Constants.testPillDaily2);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Created Successfully');
		done();
	})
	// Delete the pill so next time tests are run, pill already exists error will not occur
	it('Tests DELETE endpoint with valid parameters', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills').send(Constants.testPillDaily2);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
		done();
	})

	// Test evening user
	it('Tests POST endpoint with all PM hrs', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(Constants.testPillEvening);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Created Successfully');
		done();
	})
	// Delete the pill so next time tests are run, pill already exists error will not occur
	it('Tests DELETE endpoint with all PM hrs', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills').send(Constants.testPillEvening);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
		done();
	})

	// Test 12AM user 
	it('Tests POST endpoint with 12AM user', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(Constants.testPill12AM);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Created Successfully');
		done();
	})
	// Delete the pill so next time tests are run, pill already exists error will not occur
	it('Tests DELETE endpoint with valid user', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills').send(Constants.testPill12AM);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
		done();
	})

});

// Test Updating Schedule with UpdateTaken
describe("Update Schedule Integrated Test", () => {
	it('Tests POST endpoint with hours > 4 apart with food', async done => {
		// Sends POST Request to /pills endpoint
		let res = await request.post('/pills').send(Constants.testPillFood3Lt);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Created Successfully');

		res = await request.get('/users?userId=validUserId2');
		const reminderId = res.body.user.schedule[0][0].reminderId;
	
		takenPillLate30 = {"userId":"validUserId2", "name":"food3lt", "timeTaken" : {"day":0, "hour":23, "minute":10}, "reminderId":reminderId};
		takenPillEarly30 = {"userId":"validUserId2", "name":"food3lt", "timeTaken" : {"day":0, "hour":1, "minute":10}, "reminderId":reminderId};
		takenPillOnTime = {"userId":"validUserId2", "name":"food3lt", "timeTaken" : {"day":0, "hour":3, "minute":30}, "reminderId":reminderId};
		done();
	})
	it('Tests updateTaken with Late 30', async done => {
		const res = await request.post('/pills/taken').send(takenPillLate30);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		done();
	})
	it('Tests updateTaken with Early 30', async done => {
		const res = await request.post('/pills/taken').send(takenPillEarly30);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		done();
	})
	it('Tests updateTaken with Late 3rd time', async done => {
		const res = await request.post('/pills/taken').send(takenPillLate30);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		done();
	})
	it('Tests updateTaken on time', async done => {
		const res = await request.post('/pills/taken').send(takenPillOnTime);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		done();
	})
	// Delete the pill so next time tests are run, pill already exists error will not occur
	it('Tests DELETE endpoint with valid parameters', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills').send(Constants.testPillFood3Lt);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
		done();
	})
});

// Test Delete Schedule with Delete pill 
describe("Delete Schedule Integrated Test", () => {
	// Add 2 new pills to the user before deleting
	it('Tests POST endpoint with hours > 4 apart with food', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(Constants.testPillFood3Lt);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Created Successfully');
		done();
	})
	it('Tests POST endpoint with hours > 4 apart with food', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(Constants.testPillDaily);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Created Successfully');
		done();
	})
	it('Tests DELETE endpoint with valid parameters', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills').send(Constants.testPillFood3Lt);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
		done();
	})
	// Delete the pill so next time tests are run, pill already exists error will not occur
	it('Tests DELETE endpoint with valid parameters', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills').send(Constants.testPillDaily);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
		done();
	})
});


describe("Non-existant endpoint", () => {
	it('Tests nonexistent endpoint with invalid userId', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/bad').send(Constants.testPillInvalidUser);
		expect(res.status).toBe(404);
		done();
	})
});
