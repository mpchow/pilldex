const app = require('../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
const Constants = require('./constants.js');


// Integrated User tests
describe("Create User Integrated Test", () => {
	it('Tests POST endpoint with new user', async done => {
		// Sends POST Request to /users endpoint
		const res = await request.post('/users').send(Constants.newUser);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		done();
	})
	it('Tests POST endpoint with user that already exists', async done => {
		// Sends POST Request to /users endpoint
		const res = await request.post('/users').send(Constants.newUser);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('User Already Exists');
		done();
	})
});

describe("Get User Integrated Test", () => {
	it('Tests GET endpoint with valid userId', async done => {
		// Sends GET Request to /users endpoint
		const res = await request.get('/users?userId=validUserId');
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		done();
	})
	it('Tests GET endpoint with invalid userId', async done => {
		// Sends GET Request to /users endpoint
		const res = await request.get('/users?userId=invalidUserId');
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})
	it('Tests GET endpoint with no userId', async done => {
		// Sends GET Request to /users endpoint
		const res = await request.get('/users');
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})
});

describe("Update User Integrated Test", () => {
	it('Tests PUT endpoint with invalid userId', async done => {
		// Sends PUT Request to /users endpoint with invalid userId
		const res = await request.put('/users').send(Constants.updateUserInvalid);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})
	
	it('Tests PUT endpoint with valid userId', async done => {
		// Sends PUT Request to /users endpoint
		const res = await request.put('/users').send(Constants.updateUserValid);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		done();
	})
})

describe("Delete User Integrated Test", () => {
	it('Tests DELETE endpoint with valid userId', async done => {
		// Sends DELETE Request to /users endpoint
		const res = await request.delete('/users').send(Constants.newUser);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('Success');
		done();
	})
	it('Tests DELETE endpoint with invalid userId', async done => {
		// Sends DELETE Request to /users endpoint
		const res = await request.delete('/users').send(Constants.updateUserInvalid);
		expect(res.status).toBe(200);
		expect(res.body.msg).toBe('User Not Found');
		done();
	})
});
