const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	userId: {type: String, unique: true, required: true}, 
	wakeupHr: {type: Number, required: false},
	wakeupMin: {type: Number, required: false},
	wakeupAM: {type: Boolean, required: false},
	wakeupPM: {type: Boolean, required: false},
	sleepHr: {type: Number, required: false},
	sleepMin: {type: Number, required: false},
	sleepAM: {type: Boolean, required: false},
	sleepPM: {type: Boolean, required: false},
	breakfastHr: {type: Number, required: false},
	breakfastMin: {type: Number, required: false},
	breakfastAM: {type: Boolean, required: false},
	breakfastPM: {type: Boolean, required: false},
	lunchHr: {type: Number, required: false},
	lunchMin: {type: Number, required: false},
	lunchAM: {type: Boolean, required: false},
	lunchPM: {type: Boolean, required: false},
	dinnerHr: {type: Number, required: false},
	dinnerMin: {type: Number, required: false},
	dinnerAM: {type: Boolean, required: false},
	dinnerPM: {type: Boolean, required: false}
}); 

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', userSchema);

