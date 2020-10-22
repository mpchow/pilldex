const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
	0 : [{ time: Date, pillName: String}];
	1 : [{ time: Date, pillName: String}];
	2 : [{ time: Date, pillName: String}];
	3 : [{ time: Date, pillName: String}];
	4 : [{ time: Date, pillName: String}];
	5 : [{ time: Date, pillName: String}];
	6 : [{ time: Date, pillName: String}];
}); 

scheduleSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Schedule', userSchema);

