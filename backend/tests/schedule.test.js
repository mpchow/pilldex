// jest.mock('../pushNotification/reminder');
const scheduler = require('../pushNotification/manageSchedule');
// const reminder = require('../pushNotification/reminder');


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
   const testCreateUser = {
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

   it("Test Daily Food Pill", (done) => {
      const testPillParams = {
         name: "Tylenol",
         userId: "Z1KuReJrWHP72DZn66hMtBBaeL23",
         totalQuantity: 10,
         frequency: 1,
         frequencyUnit: 'daily',
         dosage: 1, 
         withFood: true,
         withSleep: false
      };

      const newSchedule = scheduler.createSchedule(testPillParams, testCreateUser);

      for (let i = 0; i < 7; i++) {
         expect(newSchedule[i][0].time.reminderTime).toStrictEqual({hour: 8, minute: 30});
         expect(newSchedule[i][0].pillName).toStrictEqual("Tylenol");
      }
      done();
   });

   it("Test Daily Pill", (done) => {
      const testPillParams = {
         name: "Tylenol",
         userId: "Z1KuReJrWHP72DZn66hMtBBaeL23",
         totalQuantity: 10,
         frequency: 1,
         frequencyUnit: 'daily',
         dosage: 1, 
         withFood: false,
         withSleep: false
      };

      const newSchedule = scheduler.createSchedule(testPillParams, testCreateUser);

      for (let i = 0; i < 7; i++) {
         expect(newSchedule[i][0].time.reminderTime).toStrictEqual({hour: 21, minute: 0});
         expect(newSchedule[i][0].pillName).toStrictEqual("Tylenol");
      }
      done();
   });

   it("Test Daily Sleep Pill", (done) => {
      const testPillParams = {
         name: "Tylenol",
         userId: "Z1KuReJrWHP72DZn66hMtBBaeL23",
         totalQuantity: 10,
         frequency: 1,
         frequencyUnit: 'daily',
         dosage: 1, 
         withFood: false,
         withSleep: true
      };

      const newSchedule = scheduler.createSchedule(testPillParams, testCreateUser);

      for (let i = 0; i < 7; i++) {
         expect(newSchedule[i][0].time.reminderTime).toStrictEqual({hour: 21, minute: 0});
         expect(newSchedule[i][0].pillName).toStrictEqual("Tylenol");
      }
      done();
   });


   it("Test with Sleep Pill", (done) => {
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

      const newSchedule = scheduler.createSchedule(testPillParams, testCreateUser);

      expect(newSchedule[0][0].time.reminderTime).toStrictEqual({hour: 21, minute: 0});
      expect(newSchedule[0][0].pillName).toStrictEqual("Tylenol");
      done();
   });

   it("Test with Food Pill" , (done) => {
      const testPillParams = {
         name: "Tylenol",
         userId: "Z1KuReJrWHP72DZn66hMtBBaeL23",
         totalQuantity: 10,
         frequency: 3,
         frequencyUnit: 'weekly',
         dosage: 1, 
         withFood: true,
         withSleep: false
      };

      const newSchedule = scheduler.createSchedule(testPillParams, testCreateUser);

      expect(newSchedule[0][0].time.reminderTime).toStrictEqual({hour: 8, minute: 30});
      expect(newSchedule[0][1].time.reminderTime).toStrictEqual({hour: 13, minute: 30});
      expect(newSchedule[0][1].time.reminderTime).toStrictEqual({hour: 19, minute: 30});
      expect(newSchedule[0][0].pillName).toStrictEqual("Tylenol");
      done();
   });

   it("Test with Food and Sleep Pill", (done) => {
      const testPillParams = {
         name: "Tylenol",
         userId: "Z1KuReJrWHP72DZn66hMtBBaeL23",
         totalQuantity: 10,
         frequency: 1,
         frequencyUnit: 'weekly',
         dosage: 1, 
         withFood: true,
         withSleep: true
      };

      const newSchedule = scheduler.createSchedule(testPillParams, testCreateUser);

      expect(newSchedule[0][0].time.reminderTime).toStrictEqual({hour: 8, minute: 30});
      expect(newSchedule[0][0].pillName).toStrictEqual("Tylenol");
      done();
   })

})


describe("Update Schedule Tests", () => {
   it("Pill Taken Late Multiple Times", async done => {
      const reminderToUpdate = {
         time: {
            reminderTime: {
               hour: 9,
               minute: 30
            },
            leftBound: 4,
            rightBound: 4
         },
         pillName: "Advil",
         reminderId: "1234",
         dosage: 1,
         timesLate: 2,
         adjustedTimes: [603, 603],
         takenEarly: false,
         withFood: true,
         withSleep: false
      }

      const testUpdateUser = {
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
         "schedule":[[reminderToUpdate],[],[],[],[],[],[]]
      }

      const newSchedule = scheduler.updateSchedule({timeTaken: {day: 0, hour: 10, minute: 30}, reminderId: "1234"}, testUpdateUser);

      expect(newSchedule[0][0].time.reminderTime).toStrictEqual({hour: 10, minute: 30});
      expect(newSchedule[0][0].adjustedTimes).toBe([]);
      done();
   })
})

describe("Remove Schedule Tests", () => {

   it("Delete Daily Pill", async done => {
      const reminderToDelete = {
         time: {
            reminderTime: {
               hour: 9,
               minute: 30
            },
            leftBound: 4,
            rightBound: 4
         },
         pillName: "Advil",
         reminderId: "1234",
         dosage: 1,
         timesLate: 0,
         adjustedTimes: [],
         takenEarly: false,
         withFood: true,
         withSleep: false
      }

      const testRemoveUser = {
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
         "schedule":[[reminderToDelete],[reminderToDelete],[reminderToDelete],[reminderToDelete],[reminderToDelete],[reminderToDelete],[reminderToDelete]]
      }

      const newSchedule = scheduler.deleteSchedule(testRemoveUser, "Advil");

      for (let i = 0; i < 7; i++) {
         expect(newSchedule[i].length).toStrictEqual(0);
      }
      done();

   })


})
