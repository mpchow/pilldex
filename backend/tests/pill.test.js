const pillRoute = require('./../routes/pills.js');

const testPill = {"userId":"testId", "name":"testPill", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
				  "withFood":true, "withSleep":false, "remaining":5};

const mockGetPills = jest.fn().mockImplementation((pillParams) => {
	if (pillParams.userId == "testId")
		return testPill;
	else
		return null;
	
});

test('gets pill', () => {
  expect(mockGetPills({"userId":"testId"})).toBe(testPill);
});
