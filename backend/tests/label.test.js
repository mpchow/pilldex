const pillRoute = require('./../routes/pills.js');
const mongoose = require('mongoose');

const app = require('../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

jest.mock('../modules/label_helpers');
const parser = require('../modules/label');

const testLabel = {"body":"Local Pharmacy RX# 0004921—39S CUSTOMER NAME GENERIC RX 500 MG TABLET\n TAKE ONE TABLET TWICE DAILY\n PRESCRIPTION NO. STORE NO.PRESCRIBED BY: A. DOCTOR QTY: 20 NO REFILLS REMAIN PRESCRIBER AUTH REQUIRED 123 RX AVENUE NEW YORK, NY NEW DATE FILLED: 02/05/2019 DISCARD BY: 02/05/2020 (555) 555 -555"};

const parsedLabel = {
        "name": null,
        "totalQuantity": 20,
        "frequency": 2,
        "frequencyUnit": "daily",
        "dosage": 1,
        "withFood": false,
        "withSleep": false
    };


describe("Parse Label Unit Testing", () => {
/*
	beforeEach(() => {
        jest.mock("../modules/label_helpers")
    })
*/
	test('Unit Test Parsing of label', async done => {
		res = parser.parseLabel(testLabel);
		console.log("PARSING A LABEL !!!!", res);
		expect(res.pillData).toStrictEqual(parsedLabel);
		done();
	})
});

