const { uuid } = require('uuidv4');

class Reminder {
   // Constructor
   constructor(pillParams, user, userTimes) {
      this.pillParams = pillParams;
      this.user = user;
      this.userTimes = userTimes;
   }

   // Creates new reminder 
   createReminder = (mode, hour = null, minute = null, spacing = null) => {
      let time = this.getDefaultDate(mode, hour, minute, spacing);

      return {
         time: {
            reminderTime: {
               hour: time.hour,
               minute: time.minute
            },
            leftBound: time.leftBound,
            rightBound: time.rightBound
         },
         pillName: this.pillParams.name,
         reminderId: uuid(),
         dosage: this.pillParams.dosage,
         timesLate: 0,
         adjustedTimes: [],
         takenEarly: false,
         withFood: this.pillParams.withFood,
         withSleep: this.pillParams.withSleep
      }
   };

   // Determines time to schedule the pill 
   getDefaultDate = (mode, hr, min, spacing) => {
      let hour, minute, leftBound, rightBound;
   
      if (mode === "FoodSleep") {
         hour = (this.userTimes.dinnerHr + this.userTimes.sleepHr) / 2;
         minute = 0;
         leftBound = this.userTimes.dinnerHr - this.userTimes.lunchHr < 4 ? 
					(this.userTimes.dinnerHr - this.userTimes.lunchHr) : 4;
         rightBound = this.userTimes.sleepHr - this.userTimes.dinnerHr < 4 ? 
					(this.userTimes.sleepHr - this.userTimes.dinnerHr) : 4;
      }
      else if (mode === "Sleep") {
         hour = this.userTimes.sleepHr;
         minute = this.user.sleepMin;
         leftBound = this.userTimes.sleepHr - this.userTimes.dinnerHr < 4 ? 
					(this.userTimes.sleepHr - this.userTimes.dinnerHr) : 4;
         rightBound = 4;
      }
      else if (mode === "Breakfast") {
         hour = this.userTimes.breakfastHr;
         minute = this.user.breakfastMin;
         leftBound = this.userTimes.breakfastHr - this.userTimes.wakeupHr < 4 ? (this.userTimes.breakfastHr - this.userTimes.wakeupHr) : 4;
         rightBound = this.userTimes.lunchHr - this.userTimes.breakfastHr < 4 ? (this.userTimes.lunchHr - this.userTimes.breakfastHr) : 4;
      }
      else if (mode === "Lunch") {
         hour = this.userTimes.lunchHr;
         minute = this.user.lunchMin;
         leftBound = this.userTimes.lunchHr - this.userTimes.breakfastHr < 4 ? (this.userTimes.lunchHr - this.userTimes.breakfastHr) : 4;
         rightBound = this.userTimes.dinnerHr - this.userTimes.lunchHr < 4 ? (this.userTimes.dinnerHr - this.userTimes.lunchHr) : 4;
      }
      else if (mode === "Dinner") {
         hour = this.userTimes.dinnerHr;
         minute = this.user.dinnerMin;
         leftBound = this.userTimes.dinnerHr - this.userTimes.lunchHr < 4 ? (this.userTimes.dinnerHr - this.userTimes.lunchHr) : 4;
         rightBound = this.userTimes.sleepHr - this.userTimes.dinnerHr < 4 ? (this.userTimes.sleepHr - this.userTimes.dinnerHr) : 4;
      }
      else {
         hour = hr;
         minute = min;
         leftBound = spacing;
         rightBound = spacing;
      }
   
      return ({hour: hour, minute: minute, leftBound: leftBound, rightBound: rightBound});
   }

}


module.exports = Reminder;
