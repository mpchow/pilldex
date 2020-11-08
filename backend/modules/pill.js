/* Pill Module - contains all related pill functions */

const scheduler = require('../pushNotification/manageSchedule');
const db = require('./../db/db.js');
const Pill = db.Pill;
const User = db.User;

/* Create a new pill object 
 * pillParams.name = name of target pill
 * pillParams.userId = userId of the target user
 */
const create = async (pillParams) => {
   try {
		user = await User.findOne({ userId: pillParams.userId })
		if (user === null)
			throw "User Not Found";

      	const pill = new Pill(pillParams);
      	pill.save();
     
     	// Create a schedule based on the provided parameters
		await scheduler.createSchedule(pillParams);
		return({status: 200, msg: 'Pill Created Successfully'});
   }
   catch (error) {
		return({status: 404, msg: "User Not Found"})
		console.log(error);
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
		return({status: 200, msg: 'Pill Updated Successfully'});
	}
	catch (error) {
		return getErrorMessage(pillParams);
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
		return({status: 200, msg: 'Pill Removed Successfully'});
		
	}
	catch (error) {
		return getErrorMessage(pillParams);
	}  
}

/* 
 * Get a single pill based on the provided parameters
 * pillParams.query.name = name of pill to retrieve
 * pillParams.query.userId = userId of the user
 */
const retrieve = async (pillParams) => {
	try {
		pill = await Pill.findOne({name: pillParams.query.name, userId: pillParams.query.userId})
		if (pill === null)
			throw "Could not find pill";
		return {pill: pill, status: 200, msg: 'Retrieved Pill Successfully'};
    }
    catch (error) {
		return getErrorMessage(pillParams);
    }
}

/* 
 * Get all pills of the target user
 * pillParams.query.userId = userId of the user
 */
const retrieveAll = async (pillParams) => {
	try {
		user = await User.findOne({ userId: pillParams.query.userId })
		if (user === null)
			throw "Could not find user";

		return {pill: Pill.find({userId: pillParams.query.userId}), status: 200, msg: 'Retrieved Pills Successfully'};

	}
	catch (error) {
		const newParams = {userId: pillParams.query.userId};
		return getErrorMessage(pillParams);
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
        await Pill.findOne({name: pillParams.name, userId: pillParams.userId});

		// Number of remaining pills increments by total quantity of 1 prescription
        newPill.remaining = newPill.remaining + newPill.totalQuantity;
		console.log(newPill.remaining);
        await Pill.replaceOne({name: pillParams.name, userId: pillParams.userId}, newPill);
        return {newPill, status: 200, msg:"Success"};
    }
    catch (error) {
		getErrorMessage(pillParams);
    }
}

const getErrorMessage = async (pillParams) => {
	user = await User.findOne({ userId: pillParams.userId })
	if (user === null) {
		return({status: 404, msg: "User Not Found"})
	}

	if (pillParams.hasAttribute(name)) {
		pill = await Pill.findOne({ userId: pillParams.userId, name: pillParams.name })
		if (pill === null) {
			return({status: 404, msg: "Pill Not Found"})
		}
	}
	return({status: 500, msg: "Request Failed"})
}

module.exports = {create, update, remove, retrieve, retrieveAll, updateRemaining};

// {name, userId, totalQuantity, frequency, 
//    frequencyUnit, dosage, withFood, withSleep
