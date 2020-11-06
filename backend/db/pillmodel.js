/* Pill Schema used for storing in the mongodb database */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// https://stackoverflow.com/questions/29780733/store-an-image-in-mongodb-using-node-js-express-and-mongoose
/* 
 * name = pill's name
 * userId = unique userId provided to each user
 * totalQuantity = total number of pills in one prescription
 * frequency = number of times pill should be taken per day/week
 * frequencyUnit = if pill is taken daily or weekly
 * dosage = number of pills to take per sitting
 * withFood = if pill should be taken with a meal
 * withSleep = if pill causes drowsiness and should be taken at night
 * remaining = number of capsules remaining
 */
const pillSchema = new Schema({
	name: {type: String, unique: true, required: true},
	userId: {type: String, required: true},
	totalQuantity: {type: Number, required: true},
	frequency: {type: Number, required: true},
	frequencyUnit: {type: String, required: true},
	dosage: {type: Number, required: true}, 
	withFood: {type: Boolean, required: true},
	withSleep: {type: Boolean, required: true},
	remaining: {type: Number, required: false}
}); 

pillSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Pill', pillSchema);
