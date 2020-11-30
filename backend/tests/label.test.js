const pillRoute = require('./../routes/pills.js');
const mongoose = require('mongoose');

const app = require('../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

jest.mock('../modules/label_helpers');
const parser = require('../modules/label');
const Constants = require('./constants.js');


describe("Parse Label Unit Testing", () => {
	test('Test Parsing Name', async done => {
		res = await parser.parseLabel(Constants.testLabelName);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelName);
		done();
	})
	test('Test Parsing Quantity', async done => {
		res = await parser.parseLabel(Constants.testLabelQty);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelQty);
		done();
	})
});

