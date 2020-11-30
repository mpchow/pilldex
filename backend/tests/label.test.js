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
	test('Test Parsing FreqUnit', async done => {
		res = await parser.parseLabel(Constants.testLabelFreqUnit);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelFreqUnit);
		done();
	})
	test('Test Parsing Sleep and Eat conditions', async done => {
		res = await parser.parseLabel(Constants.testLabelConditions);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelConditions);
		done();
	})
	test('Test Parsing Sleep and NOT Eat conditions', async done => {
		res = await parser.parseLabel(Constants.testLabelSleep);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelSleep);
		done();
	})
	test('Test Parsing Eat and NOT Sleep conditions', async done => {
		res = await parser.parseLabel(Constants.testLabelEat);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelEat);
		done();
	})
	test('Test Parsing Dosage', async done => {
		res = await parser.parseLabel(Constants.testLabelDosage);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelDosage);
		done();
	})
	test('Test Parsing Frequency', async done => {
		res = await parser.parseLabel(Constants.testLabelFreq);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelFreq);
		done();
	})
	test('Test Parsing empty', async done => {
		res = await parser.parseLabel("");
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelNull);
		done();
	})
	test('Test Parsing qty before name with digit', async done => {
		res = await parser.parseLabel(Constants.testLabelNQ1);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelNQ1);
		done();
	})
	test('Test Parsing qty before name with word number', async done => {
		res = await parser.parseLabel(Constants.testLabelNQ2);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelNQ2);
		done();
	})
	test('Test Parsing all fields with digits', async done => {
		res = await parser.parseLabel(Constants.testLabelAll1);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelAll);
		done();
	})
	test('Test Parsing all fields with word numbers', async done => {
		res = await parser.parseLabel(Constants.testLabelAll2);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelAll);
		done();
	})
	test('Test Parsing with Invalid index bounds for name', async done => {
		res = await parser.parseLabel(Constants.testLabelName);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelName);
		done();
	})
	test('Test Parsing with Invalid index bounds for dosage', async done => {
		res = await parser.parseLabel(Constants.testLabelBounds);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelAll);
		done();
	})
	test('Test Parsing with non-useful label', async done => {
		res = await parser.parseLabel(Constants.testLabelNone);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelNull);
		done();
	})
	test('Test Parsing with mix-cased name', async done => {
		res = await parser.parseLabel(Constants.testLabelMixName);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelName);
		done();
	})
	test('Test Parsing with mix-cased conditions', async done => {
		res = await parser.parseLabel(Constants.testLabelMixConditions);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelConditions);
		done();
	})
	test('Test Parsing with mix-cased frequency unit', async done => {
		res = await parser.parseLabel(Constants.testLabelMixFreq);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelFreqUnit);
		done();
	})
	test('Test Parsing with new lines', async done => {
		res = await parser.parseLabel(Constants.testLabelNL);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelAll);
		done();
	})
	test('Test Parsing with extra spacing', async done => {
		res = await parser.parseLabel(Constants.testLabelNL);
		console.log(res);
		expect(res.pillData).toStrictEqual(Constants.parsedLabelAll);
		done();
	})
});

