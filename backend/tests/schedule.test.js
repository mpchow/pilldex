// jest.mock('../pushNotification/reminder');
const scheduler = require('../pushNotification/manageSchedule');
const reminder = require('../pushNotification/reminder');

const testUser = {
   "token":"dDjHv9gvQKC_1g2FkjZN1A:APA91bFXWSDCa-rzrVxUeUWS2ujBgN1ri0K0ihsSkIjBixi2UYAl8WeZQtfJngiKy7nh8HwklNA8dQ73Bknn_GY_AZeEM8m-GyzxqoxhuKQef7YbTM9osEgqE7tjZ6k9zTHJjYiRCCqA",
   "userId":"Z1KuReJrWHP72DZn66hMtBBaeL23",
   "wakeupHr":8,
   "wakeupMin":0,
   "wakeupAM":true,
   "sleepHr":9,
   "sleepMin":0,
   "sleepAM":false,
   "breakfastHr":8,
   "breakfastMin":30,
   "breakfastAM":true,
   "lunchHr":1,
   "lunchMin":0,
   "lunchAM":false,
   "dinnerHr":7,
   "dinnerMin":0,
   "dinnerAM":false,
   "schedule":[[],[],[],[],[],[],[]]
}

// reminder.mockImplementation((pillParams, user, userTime) => {


//    const createReminderMock = jest.fn().mockImplementation((mode, hour = null, minute = null, spacing = null) => {

//       if(mode === )
      
//       return {
//          time: {
//             reminderTime: {
//                hour: time.hour,
//                minute: time.minute
//             },
//             leftBound: time.leftBound,
//             rightBound: time.rightBound
//          },
//          pillName: pillParams.name,
//          reminderId: "1234",
//          dosage: pillParams.dosage,
//          timesLate: 0,
//          adjustedTimes: [],
//          takenEarly: false,
//          withFood: pillParams.withFood,
//          withSleep: pillParams.withSleep
//       }
//    })

//    return {
//       createReminder: createReminderMock
//    }
// })

describe("Creating Schedule Tests", () => {
   it("Test with Sleep Pill", async (done) => {
      const testPillParams = {
         name: "Tylenol",
         userId: "Z1KuReJrWHP72DZn66hMtBBaeL23",
         totalQuantity: 10,
         frequency: 1,
         frequencyUnit: 'weekly',
         dosage: 1, 
         withFood: false,
         withSleep: true
      };

      let newSchedule = scheduler.createSchedule(testPillParams, testUser);

      expect(newSchedule[0][0].time.reminderTime).toStrictEqual({hour: 21, minute: 0});
      expect(newSchedule)
      done();
   });

   // it("Test with Food Pill" , () => {

   // })

   // it("Test with")

})


describe("Update Schedule Tests", () => {

})

describe("Remove Schedule Tests", () => {


})
