const db = require('./../db/db.js');
const Pill = db.Pill;

const create = async (pillParams) => {

	if (await Pill.findOne({ name: pillParams.name })) {
		throw 'The Pill "' + name + '" is already in the pilldex';
	}

	const pill = new Pill(pillParams);
	pill.save();
}

const update = () => {

}

const remove = () => {

}

const retrieve = () => {

}

module.exports = {create, update, remove, retrieve};

// {name, userId, totalQuantity, frequency, 
//    frequencyUnit, dosage, withFood, withSleep
