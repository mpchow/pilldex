const scheduler = require('../pushNotification/manageSchedule');
const db = require('./../db/db.js');
const Pill = db.Pill;

const create = async (pillParams) => {
   try {
      await Pill.findOne({ name: pillParams.name, userId: pillParams.userId })
      const pill = new Pill(pillParams);
      pill.save();
      await scheduler.createSchedule(pillParams);
      return({msg: 'Success'});
   }
   catch (error) {
	  console.log(error);
      throw 'The Pill ' + name + ' is already in the pilldex';
   }
}

const update = async (pillParams) => {
	try {
        await Pill.replaceOne({name: pillParams.name, userId: pillParams.userId}, pillParams);
		await scheduler.removeSchedule(pillParams.userId, pillParams.name);
		await scheduler.createSchedule(pillParams);
		return({msg: 'Success'});
	}
	catch (error) {
		throw `The Pill ${pillParams.name} could not be updated`;
	}
}

const remove = async (pillParams) => {
	try {
		await Pill.deleteOne({name: pillParams.name, userId: pillParams.userId});
        await scheduler.deleteSchedule(pillParams.userId, pillParams.name);
		return({msg: 'Success'});
	}
	catch (error) {
		throw `The Pill ${pillParams.name} could not be deleted`;
	}  
}

const retrieve = async (pillParams) => {
	try {
		return {pill: await Pill.findOne({name: pillParams.query.name, userId: pillParams.query.userId}), msg: 'Success'};
    }
    catch (error) {
        throw `The Pill ${pillParams.name} could not be retrieved`;
    }
}

const retrieveAll = async (pillParams) => {
	try {
	   return {pill: await Pill.find({userId: pillParams.query.userId}), msg: 'Success'};
	}
	catch (error) {
	   throw `The Pills could not be retrieved`;
	}
}

const updateRemaining = async (pillParams) => {
    try {
        newPill = await Pill.findOne({name: pillParams.name, userId: pillParams.userId});
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
