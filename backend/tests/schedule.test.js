const scheduler = require('../modules/manageSchedule');

jest.mock('../modules/reminder');

describe("Creating Schedule Tests", () => {
   beforeEach(() => jest.resetModules());

   it("Test Daily Pill", (done) => {
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

   it("Test Daily Pill With AM User", (done) => {
      const testCreateUser = {
         "token":"dDjHv9gvQKC_1g2FkjZN1A:APA91bFXWSDCa-rzrVxUeUWS2ujBgN1ri0K0ihsSkIjBixi2UYAl8WeZQtfJngiKy7nh8HwklNA8dQ73Bknn_GY_AZeEM8m-GyzxqoxhuKQef7YbTM9osEgqE7tjZ6k9zTHJjYiRCCqA",
         "userId":"Z1KuReJrWHP72DZn66hMtBBaeL23",
         "wakeupHr":12,
         "wakeupMin":0,
         "wakeupAM":true,
         "sleepHr":11,
         "sleepMin":0,
         "sleepAM":true,
         "breakfastHr":6,
         "breakfastMin":30,
         "breakfastAM":true,
         "lunchHr":8,
         "lunchMin":0,
         "lunchAM":true,
         "dinnerHr":10,
         "dinnerMin":0,
         "dinnerAM":true,
         "schedule":[[],[],[],[],[],[],[]]
      }

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
         expect(newSchedule[i][0].time.reminderTime).toStrictEqual({hour: 11, minute: 0});
         expect(newSchedule[i][0].pillName).toStrictEqual("Tylenol");
      }
      done();
   });

   it("Test Daily Pill With PM User", (done) => {
      const testCreateUser = {
         "token":"dDjHv9gvQKC_1g2FkjZN1A:APA91bFXWSDCa-rzrVxUeUWS2ujBgN1ri0K0ihsSkIjBixi2UYAl8WeZQtfJngiKy7nh8HwklNA8dQ73Bknn_GY_AZeEM8m-GyzxqoxhuKQef7YbTM9osEgqE7tjZ6k9zTHJjYiRCCqA",
         "userId":"Z1KuReJrWHP72DZn66hMtBBaeL23",
         "wakeupHr":5,
         "wakeupMin":0,
         "wakeupAM":false,
         "sleepHr":11,
         "sleepMin":0,
         "sleepAM":false,
         "breakfastHr":6,
         "breakfastMin":30,
         "breakfastAM":false,
         "lunchHr":8,
         "lunchMin":0,
         "lunchAM":false,
         "dinnerHr":10,
         "dinnerMin":0,
         "dinnerAM":false,
         "schedule":[[],[],[],[],[],[],[]]
      }

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
         expect(newSchedule[i][0].time.reminderTime).toStrictEqual({hour: 23, minute: 0});
         expect(newSchedule[i][0].pillName).toStrictEqual("Tylenol");
      }
      done();
   });

   it("Test Daily Sleep Pill", (done) => {
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

   it("Test Daily Food Pill", (done) => {
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
      const testPillParams = {
         name: "Tylenol",
         userId: "Z1KuReJrWHP72DZn66hMtBBaeL23",
         totalQuantity: 10,
         frequency: 3,
         frequencyUnit: 'daily',
         dosage: 1, 
         withFood: true,
         withSleep: false
      };

      const check = [
         {hour: 8, minute: 30},
         {hour: 13, minute: 0},
         {hour: 19, minute: 0}
      ]
      const newSchedule = scheduler.createSchedule(testPillParams, testCreateUser);

      for (let i = 0; i < 7; i++) {
         for(j = 0; j < 3; j++) {
            expect(newSchedule[i][j].time.reminderTime).toStrictEqual(check[j]);
            expect(newSchedule[i][j].pillName).toStrictEqual("Tylenol");
         }
      }
      done();
   });

   it("Test with Food Pill" , (done) => {
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
      const testPillParams = {
         name: "Tylenol",
         userId: "Z1KuReJrWHP72DZn66hMtBBaeL23",
         totalQuantity: 10,
         frequency: 3,
         frequencyUnit: 'daily',
         dosage: 1, 
         withFood: true,
         withSleep: false
      };

      const newSchedule = scheduler.createSchedule(testPillParams, testCreateUser);

      expect(newSchedule[0][0].time.reminderTime).toStrictEqual({hour: 8, minute: 30});
      expect(newSchedule[0][1].time.reminderTime).toStrictEqual({hour: 13, minute: 0});
      expect(newSchedule[0][2].time.reminderTime).toStrictEqual({hour: 19, minute: 0});
      expect(newSchedule[0][0].pillName).toStrictEqual("Tylenol");
      done();
   });

   it("Test with Food and Sleep Pill", (done) => {
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

      expect(newSchedule[0][0].time.reminderTime).toStrictEqual({hour: 20, minute: 0});
      expect(newSchedule[0][0].pillName).toStrictEqual("Tylenol");
      done();
   })

   it("Test 2 times a week Pill", (done) => {
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
      const testPillParams = {
         name: "Tylenol",
         userId: "Z1KuReJrWHP72DZn66hMtBBaeL23",
         totalQuantity: 10,
         frequency: 2,
         frequencyUnit: 'weekly',
         dosage: 1, 
         withFood: true,
         withSleep: false
      };

      const newSchedule = scheduler.createSchedule(testPillParams, testCreateUser);

      expect(newSchedule[0][0].time.reminderTime).toStrictEqual({hour: 8, minute: 30});
      expect(newSchedule[4][0].time.reminderTime).toStrictEqual({hour: 8, minute: 30});
      expect(newSchedule[0][0].pillName).toStrictEqual("Tylenol");
      expect(newSchedule[4][0].pillName).toStrictEqual("Tylenol");
      done();
   })
})


describe("Update Schedule Tests", () => {
   it("Update Nonexistent Pill", async done => {
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
         "schedule":[[],[],[],[],[],[],[]]
      }

      const newSchedule = scheduler.updateSchedule({timeTaken: {day: 0, hour: 10, minute: 30}, reminderId: "1234"}, testUpdateUser);

      expect(newSchedule).toBe(testUpdateUser.schedule);
      done();
   })

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
         adjustedTimes: [630, 630],
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

      expect(newSchedule[0][0].time.reminderTime).toStrictEqual({hour: 10, minute: 25});
      expect(newSchedule[0][0].adjustedTimes).toStrictEqual([]);
      done();
   })

   it("Pill Taken Late First Time", async done => {
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
         timesLate: 0,
         adjustedTimes: [],
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

      expect(newSchedule[0][0].adjustedTimes).toStrictEqual([616]);
      done();
   })

   it("Pill Taken Early First Time", async done => {
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
         timesLate: 0,
         adjustedTimes: [],
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

      const newSchedule = scheduler.updateSchedule({timeTaken: {day: 0, hour: 8, minute: 30}, reminderId: "1234"}, testUpdateUser);

      expect(newSchedule[0][0].adjustedTimes).toStrictEqual([524]);
      done();

   })

   it("Pill Taken within 30 min", async done => {
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
         timesLate: 0,
         adjustedTimes: [],
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

      const newSchedule = scheduler.updateSchedule({timeTaken: {day: 0, hour: 9, minute: 35}, reminderId: "1234"}, testUpdateUser);

      expect(newSchedule[0][0].adjustedTimes).toStrictEqual([]);
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


   it("Delete 1 Daily Pill", async done => {
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

      const reminderToNotDelete = {
         time: {
            reminderTime: {
               hour: 11,
               minute: 30
            },
            leftBound: 4,
            rightBound: 4
         },
         pillName: "Tylenol",
         reminderId: "1235",
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
         "schedule":[[reminderToDelete, reminderToNotDelete],[reminderToDelete,reminderToNotDelete],[reminderToDelete,reminderToNotDelete],[reminderToDelete,reminderToNotDelete],[reminderToDelete,reminderToNotDelete],[reminderToDelete,reminderToNotDelete],[reminderToDelete,reminderToNotDelete]]
      }

      const newSchedule = scheduler.deleteSchedule(testRemoveUser, "Advil");

      for (let i = 0; i < 7; i++) {
         expect(newSchedule[i][0]).toStrictEqual(reminderToNotDelete);
      }
      done();

   })

   it("Delete Weekly Pill", async done => {
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

      const reminderToNotDelete = {
         time: {
            reminderTime: {
               hour: 11,
               minute: 30
            },
            leftBound: 4,
            rightBound: 4
         },
         pillName: "Tylenol",
         reminderId: "1235",
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
         "schedule":[[reminderToNotDelete],[reminderToNotDelete],[reminderToNotDelete],[reminderToDelete,reminderToNotDelete],[reminderToNotDelete],[reminderToNotDelete],[reminderToNotDelete]]
      }

      const newSchedule = scheduler.deleteSchedule(testRemoveUser, "Advil");

      for (let i = 0; i < 7; i++) {
         expect(newSchedule[i][0]).toStrictEqual(reminderToNotDelete);
      }
      done();
   })
   
   it("Don't Delete Any Pill", async done => {
      const reminderToNotDelete = {
         time: {
            reminderTime: {
               hour: 11,
               minute: 30
            },
            leftBound: 4,
            rightBound: 4
         },
         pillName: "Tylenol",
         reminderId: "1235",
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
         "schedule":[[reminderToNotDelete],[reminderToNotDelete],[reminderToNotDelete],[reminderToNotDelete],[reminderToNotDelete],[reminderToNotDelete],[reminderToNotDelete]]
      }

      const newSchedule = scheduler.deleteSchedule(testRemoveUser, "Advil");

      for (let i = 0; i < 7; i++) {
         expect(newSchedule[i][0]).toStrictEqual(reminderToNotDelete);
         expect(newSchedule[i].length).toStrictEqual(1);
      }
      done();
   })
})
