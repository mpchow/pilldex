/* Pill Module - contains all related pill functions */

const scheduler = require('../pushNotification/manageSchedule');
const db = require('./../db/db.js');
const Pill = db.Pill;

/* Create a new pill object 
 * pillParams.name = name of target pill
 * pillParams.userId = userId of the target user
 */
const create = async (pillParams) => {
   try {
	  // TODO: Check for existing user
	  
      // Create new pill with provided fields and save to db
      await Pill.findOne({ name: pillParams.name, userId: pillParams.userId })
      const pill = new Pill(pillParams);
      pill.save();
     
      // Create a schedule based on the provided parameters
      await scheduler.createSchedule(pillParams);
      return({msg: 'Success'});
   }
   catch (error) {
	  console.log(error);
      throw 'The Pill ' + name + ' is already in the pilldex';
   }
}

/*
 * Updates the pill object 
 * pillParams.name = name of target pill
 * pillParams.userId = userId of the target user
 */
const update = async (pillParams) => {
	try {
		// Update fields, and create new schedule based on updated info
        await Pill.replaceOne({name: pillParams.name, userId: pillParams.userId}, pillParams);
		await scheduler.removeSchedule(pillParams.userId, pillParams.name);
		await scheduler.createSchedule(pillParams);
		return({msg: 'Success'});
	}
	catch (error) {
		throw `The Pill ${pillParams.name} could not be updated`;
	}
}

/* 
 * Remove a pill from the db
 * pillParams.name = name of target pill
 * pillParams.userId = userId of the target user
 */
const remove = async (pillParams) => {
	try {
		// Check if pill is in the db, and remove
		await Pill.deleteOne({name: pillParams.name, userId: pillParams.userId});
		// Delete the pill's corresponding schedule so outdated notifications are not sent
        await scheduler.deleteSchedule(pillParams.userId, pillParams.name);
		return({msg: 'Success'});
	}
	catch (error) {
		throw `The Pill ${pillParams.name} could not be deleted`;
	}  
}

/* 
 * Get a single pill based on the provided parameters
 * pillParams.query.name = name of pill to retrieve
 * pillParams.query.userId = userId of the user
 */
const retrieve = async (pillParams) => {
	try {
		return {pill: await Pill.findOne({name: pillParams.query.name, userId: pillParams.query.userId}), msg: 'Success'};
    }
    catch (error) {
        throw `The Pill ${pillParams.name} could not be retrieved`;
    }
}

/* 
 * Get all pills of the target user
 * pillParams.query.userId = userId of the user
 */
const retrieveAll = async (pillParams) => {
	try {
	   return {pill: await Pill.find({userId: pillParams.query.userId}), msg: 'Success'};
	}
	catch (error) {
	   throw `The Pills could not be retrieved`;
	}
}

/* 
 * Update the number of remaining capsules 
 * This function is called after the user refills their prescription 
 * pillParams.name = name of the target pill
 * pillParams.userId = userId of the user
 */
const updateRemaining = async (pillParams) => {
    try {
        newPill = await Pill.findOne({name: pillParams.name, userId: pillParams.userId});

		// Number of remaining pills increments by total quantity of 1 prescription
        newPill.remaining = newPill.remaining + newPill.totalQuantity;
		console.log(newPill.remaining);
        await Pill.replaceOne({name: pillParams.name, userId: pillParams.userId}, newPill);
        return {newPill, msg:"Success"};
    }
    catch (error) {
       throw `The remaining capsuls could not be updated`;
    }
}

module.exports = {create, update, remove, retrieve, retrieveAll, updateRemaining};

// {name, userId, totalQuantity, frequency, 
//    frequencyUnit, dosage, withFood, withSleep
