const manageSchedule = require('../pushNotification/manageSchedule');
const db = require('./../db/db.js');
const Pill = db.Pill;

const create = async (pillParams) => {
   try {
      await Pill.findOne({ name: pillParams.name, userId: pillParams.userId })
      const pill = new Pill(pillParams);
      pill.save();
      manageSchedule.updateSchedule(pillParams.userId, pillParams);
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
		manageSchedule.removeSchedule(pillParams.userId, pillParams.name);
		manageSchedule.updateSchedule(pillParams.userId, pillParams);
		return({msg: 'Success'});
	}
	catch (error) {
		throw `The Pill ${pillParams.name} could not be updated`;
	}
}

const remove = async (pillParams) => {
	try {
		await Pill.deleteOne({name: pillParams.name, userId: pillParams.userId});
        manageSchedule.deleteSchedule(pillParams.userId, pillParams.name);
		return({msg: 'Success'});
	}
	catch (error) {
		throw `The Pill ${pillParams.name} could not be deleted`;
	}  
}

const retrieve = async (pillParams) => {
	try {
		return {pill: await Pill.findOne({name: pillParams.name, userId: pillParams.userId}), msg: 'Success'};
    }
    catch (error) {
        throw `The Pill ${pillParams.name} could not be retrieved`;
    }
}

const retrieveAll = async () => {
	try {
	   return {pill: await Pill.find({}), msg: 'Success'};
	}
	catch (error) {
	   throw `The Pills could not be retrieved`;
	}
}

const parseLabel = async (label) => {
	try {
		console.log(label);
		return({msg: 'Success'});
	}
	catch (error) {
	   throw `The label could not be parsed`;
	}
}

module.exports = {create, update, remove, retrieve, retrieveAll, parseLabel};

// {name, userId, totalQuantity, frequency, 
//    frequencyUnit, dosage, withFood, withSleep
