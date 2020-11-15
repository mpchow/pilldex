const testPill = {"userId":"testId", "name":"testPill", "totalQuantity":10, "frequency":2, "frequencyUnit":"daily", "dosage":1,
				  "withFood":true, "withSleep":false, "remaining":5};

// Expected error results
const userNotFound = {status: 404, msg: "User Not Found"};
const pillNotFound = {status: 404, msg: "Pill Not Found"};

// Mocks the retrieveAll function from the pill module
const mockRetrieveAll= jest.fn().mockImplementation((pillParams) => {
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

// Mocks the retrieveAll function from the pill module
const mockRetrieve= jest.fn().mockImplementation((pillParams) => {
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

