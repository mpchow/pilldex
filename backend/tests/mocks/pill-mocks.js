const pillRoute = require('./../routes/pills.js');

// TODO: create a testing database instead
const testPill = {"userId":"testId", "name":"testPill", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
				  "withFood":true, "withSleep":false, "remaining":5};

// Expected error results
const userNotFound = {status: 404, msg: "User Not Found"};
const pillNotFound = {status: 404, msg: "Pill Not Found"};

// Mocks the retrieveAll function from the pill module
const mockGetPills = jest.fn().mockImplementation((pillParams) => {
	// Check for valid userId
	if (pillParams.userId == "testId") {
		res = {
			status:  200,
			pills: testPill,   
			msg: "Retrieved Pills Successfully"	
		}
		return res;
	}

	// Otherwise return error status
	else {
		return userNotFound;
   }
	
});
/*
const mockGetPills = jest.fn().mockImplementation((pillParams) => {
	if (pillParams.userId == "testId")
		return testPill;
	else {
		return null;
    }
	
});

test('gets pill', () => {
  expect(mockGetPills({"userId":"testId"})).toBe(testPill);
});
*/

