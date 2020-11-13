const userRoute = require('./../routes/users.js');

const app = require('../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

const newUser = {"token":"testToken", "userId":"validUserId", "wakeupHr":10, "wakeupMin":10, "wakeupAM":true, "wakeupPM":false, "sleepHr":10, "sleepMin":10, "sleepAM":false, "sleepPM":true,
				 "breakfastHr":10, "breakfastMin":30, "breakfastAM":true, "breakfastPM":false, "lunchHr":12, "lunchMin":0, "lunchAM":false, "lunchPM":true, "dinnerHr":7, "dinnerMin":15,
				 "dinnerAM":false, "dinnerPM":true, 
				 "schedule":[null, null, null, null, null, null, null]};

const updateUserValid = {"token":"testToken", "userId":"validUserId", "wakeupHr":8, "wakeupMin":50, "wakeupAM":true, "wakeupPM":false, "sleepHr":10, "sleepMin":10, "sleepAM":false, "sleepPM":true,
				 "breakfastHr":10, "breakfastMin":30, "breakfastAM":true, "breakfastPM":false, "lunchHr":12, "lunchMin":0, "lunchAM":false, "lunchPM":true, "dinnerHr":7, "dinnerMin":15,
				 "dinnerAM":false, "dinnerPM":true, 
				 "schedule":[null, null, null, null, null, null, null]};

const updateUserInvalid = {"token":"testToken", "userId":"invalidUserId", "wakeupHr":8, "wakeupMin":50, "wakeupAM":true, "wakeupPM":false, "sleepHr":10, "sleepMin":10, "sleepAM":false };

// Integrated tests
describe("Create User Integrated Test", () => {
	it('Tests POST endpoint with new user', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/users').send(newUser);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		done();
	})
	it('Tests POST endpoint with user that already exists', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.post('/users').send(newUser);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('User Already Exists');
		done();
	})
});

describe("Get User Integrated Test", () => {
	it('Tests GET endpoint with valid userId', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.get('/users?userId=validUserId');
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		done();
	})
	it('Tests GET endpoint with invalid userId', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.get('/users?userId=invalidUserId');
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})
});

describe("Update User Integrated Test", () => {
	it('Tests PUT endpoint with invalid userId', async done => {
		// Sends PUT Request to /pills endpoint with invalid userId
		const res = await request.put('/users').send(updateUserInvalid);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})
	
	it('Tests PUT endpoint with valid userId', async done => {
		// Sends PUT Request to /pills endpoint
		const res = await request.put('/users').send(updateUserValid);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		done();
	})
})

describe("Delete User Integrated Test", () => {
	it('Tests DELETE endpoint with valid userId', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.delete('/users?userId=validUserId');
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		done();
	})
	it('Tests DELETE endpoint with invalid userId', async done => {
		// Sends POST Request to /pills endpoint
		const res = await request.delete('/users?userId=invalidUserId');
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})
});
