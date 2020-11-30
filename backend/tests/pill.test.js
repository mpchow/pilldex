const Constants = require('./constants.js');
const pillRoute = require('./../routes/pills.js');
const mongoose = require('mongoose');
//jest.mock('./mocks/pill-mocks.js');

const app = require('../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)


// Integrated tests
describe("Create Pill Integrated Test", () => {
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
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Updated Successfully');
		done();
	})
});

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
		const res = await request.delete('/pills').send(Constants.testPillValid);
		expect(res.status).toBe(200);
//		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
		done();
	})
});

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

