const pillRoute = require('./../routes/pills.js');

// TODO: create a testing database instead
const testPill = {"userId":"testId", "name":"testPill", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
				  "withFood":true, "withSleep":false, "remaining":5};

// Mocks the retrieveAll function from the pill module
const mockGetPills = jest.fn().mockImplementation((pillParams) => {
	// Check for valid userId
	if (pillParams.userId == "testId") {
		res = {
         status:  200,
         headers: { "content-type": "application/json" },
         body: testPill   
      }
		return res;
	}

	// Otherwise return error status
	else {
		res = {
         status:  404,
         headers: { "content-type": "application/json" },
         body: "User Not Found" 
      }
		return res;
   }
	
});

// Tests that the pill is retreived 
test('gets pill', () => {
  expect(mockGetPills({"userId":"testId"})).objectContaining(testPill);
});

// Tests that an error is returned 
test(' Invalid getPills call', () => {
  expect(mockGetPills({"userId":"invalidId"})).stringContaining("User Not Found");
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

