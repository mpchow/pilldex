/* Pill Module - contains all related pill functions */

const scheduler = require('./manageSchedule.js');
const db = require('./../db/db.js');
const Pill = db.Pill;
const User = db.User;

/* Create a new pill object 
 * pillParams.name = name of target pill
 * pillParams.userId = userId of the target user
 */
const create = async (pillParams) => {
   try {
		let user = await User.findOne({ userId: pillParams.userId })
		if (user === null)
			throw "User Not Found";

		else {
	      const pill = new Pill(pillParams);
    	  	pill.save();
    	 
    	 	// Create a schedule based on the provided parameters
			const newSchedule = scheduler.createSchedule(pillParams, user);
			await User.findOneAndUpdate({userId: pillParams.userId}, {schedule: newSchedule});

			return({status: 200, msg: 'Pill Created Successfully'});
		}
   }
   catch (error) {
		return({status: 404, msg: "User Not Found"})
   }
}

/*
 * Updates the pill object 
 * pillParams.name = name of target pill
 * pillParams.userId = userId of the target user
 */
const update = async (pillParams) => {
	try {
		let user = await User.findOne({ userId: pillParams.userId });
		if (user === null)
			throw "User Not Found";

		// Update fields, and create new schedule based on updated info
		let pill = await Pill.findOne({name: pillParams.name, userId: pillParams.userId});
		if (pill === null)
			throw "Pill Not Found";

		await Pill.replaceOne({name: pillParams.name, userId: pillParams.userId}, pillParams);

		let newSchedule = scheduler.deleteSchedule(user, pillParams.name);
		await User.findOneAndUpdate({userId: pillParams.userId}, {schedule: newSchedule});


		user = await User.findOne({ userId: pillParams.userId });

		newSchedule = scheduler.createSchedule(pillParams, user);
		await User.findOneAndUpdate({userId: pillParams.userId}, {schedule: newSchedule});

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
		let user = await User.findOne({ userId: pillParams.userId });
		if (user === null){
			throw "User Not Found";
		}

		// Check if pill is in the db, and remove
		let pill = await Pill.findOne({name: pillParams.name, userId: pillParams.userId});
		if (pill === null)
			throw "Pill Not Found";

		await Pill.deleteOne({name: pillParams.name, userId: pillParams.userId});

		// Delete the pill's corresponding schedule so outdated notifications are not sent
		let newSchedule = scheduler.deleteSchedule(user, pillParams.name);
		await User.findOneAndUpdate({userId: pillParams.userId}, {schedule: newSchedule});

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
		let pill = await Pill.findOne({name: pillParams.query.name, userId: pillParams.query.userId})
		if (pill === null)
			throw "Could not find pill";
		return ({pill: pill, status: 200, msg: 'Retrieved Pill Successfully'});
    }
    catch (error) {
		const newParams = {userId: pillParams.query.userId, name: pillParams.query.name};
		return getErrorMessage(newParams);
    }
}

/* 
 * Get all pills of the target user
 * pillParams.query.userId = userId of the user
 */
const retrieveAll = async (pillParams) => {
	try {
		let user = await User.findOne({ userId: pillParams.query.userId })
		if (user === null)
			throw "Could not find user";
		
		let pills = await Pill.find({userId: pillParams.query.userId});
		return ({pills: pills, status: 200, msg: 'Retrieved Pills Successfully'});

	}
	catch (error) {
		const newParams = {userId: pillParams.query.userId};
		return getErrorMessage(newParams);
	}
}

/* 
 * Decrement number of pills remaining and update schedule 
 * pillParams.userId = userId of the user
 */
const updateTaken = async (pillParams) => {
	try{
		let user = await User.findOne({userId: pillParams.userId});
		if(user === null)
			throw "User Not Found";

		let pill = await Pill.findOne({name: pillParams.name});
		if (pill === null)
			throw "Pill Not Found";

		else {
			const newSchedule = scheduler.updateSchedule(pillParams, user);
			await User.findOneAndUpdate({userId: user.userId}, {schedule: newSchedule});
			await Pill.findOneAndUpdate({name: pillParams.name}, {remaining: pill.remaining - pill.dosage});
			
			return({status: 200, msg: 'Pill Updated Successfully'});
		}
	}
	catch (error) {
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
        let newPill = await Pill.findOne({name: pillParams.name, userId: pillParams.userId});
		if (newPill === null) {
			throw 'Not Found';
		}

		// Number of remaining pills increments by total quantity of 1 prescription
        newPill.remaining = newPill.remaining + newPill.totalQuantity;
        await Pill.replaceOne({name: pillParams.name, userId: pillParams.userId}, newPill);
        return ({status: 200, msg:"Success"});
    }
    catch (error) {
		return getErrorMessage(pillParams);
    }
}

const getErrorMessage = async (pillParams) => {
	let user = await User.findOne({ userId: pillParams.userId })

	if (user === null) {
		return({status: 404, msg: "User Not Found"})
	}
	else {
		return({status: 404, msg: "Pill Not Found"})
	}
}

module.exports = {create, update, remove, retrieve, retrieveAll, updateRemaining, updateTaken};

