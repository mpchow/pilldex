const pillRoute = require('./../routes/pills.js');
const mongoose = require('mongoose');
//jest.mock('./mocks/pill-mocks.js');

const app = require('../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

const time = require('../util/time');
const sinon = require('sinon');
sinon.stub(time, 'setTimeout');

const testPillInvalidUser = {"userId":"invalidUserId", "name":"invalidUserPill", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
				  "withFood":true, "withSleep":false, "remaining":5};

const testPillValid= {"userId":"validUserId2", "name":"testPill", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
				  "withFood":true, "withSleep":false, "remaining":5};

const testPillInvalidName= {"userId":"validUserId2", "name":"invalidName", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
				  "withFood":true, "withSleep":false, "remaining":5};


// Expected error results
const userNotFound = {status: 404, msg: "User Not Found"};
const pillNotFound = {status: 404, msg: "Pill Not Found"};

// Integrated tests
describe("Create Pill Integrated Test", () => {
	it('Tests PUT endpoint with invalid userId', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(testPillInvalidUser);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})

	it('Tests PUT endpoint with valid userId', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/pills').send(testPillValid);
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Created Successfully');
		done();
	})

});


describe("Get Pills Integrated Test", () => {
	it('Tests Get endpoint with invalid userId', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.get('/pills?userId=invalidUserId');
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})

	it('Tests Get endpoint with valid userId', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.get('/pills?userId=validUserId2');
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Retrieved Pills Successfully');
		done();
	})
});

describe("Get Pill By ID Integrated Test", () => {
	it('Tests Get endpoint with invalid userId', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.get('/pills/?userId=invalidUserId&name=testPill');
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})

	it('Tests Get endpoint with invalid pillName', async done => {
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

describe("Delete Pill Integrated Test", () => {
	it('Tests DELETE endpoint with invalid userId', async done => {
		// Sends DELETE Request to /pills endpoint
		const res = await request.delete('/pills?userId=invalidUserId&name=testPill');
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})
	it('Tests PUT endpoint with invalid pillName', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills?userId=validUserId2&name=invalidName');
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(404);
		expect(res.body.msg).toBe('Pill Not Found');
		done();
	})
	it('Tests PUT endpoint with valid parameters', async done => {
		// Sends GET Request to /pills endpoint
		const res = await request.delete('/pills?userId=validUserId2&name=testPill');
		expect(res.status).toBe(200);
		expect(res.body.status).toBe(200);
		expect(res.body.msg).toBe('Pill Removed Successfully');
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

