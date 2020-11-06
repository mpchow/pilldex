/* Schedule schema for storage in the mongodb database */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * Each day of the week will have a list of pills
 * and the times they should be taken
 *
 * This will be used to dictate when notifications are sent
 */
const scheduleSchema = new Schema({
	0 : [{ time: Date, pillName: String}],
	1 : [{ time: Date, pillName: String}],
	2 : [{ time: Date, pillName: String}], 
	3 : [{ time: Date, pillName: String}],
	4 : [{ time: Date, pillName: String}],
	5 : [{ time: Date, pillName: String}],
	6 : [{ time: Date, pillName: String}]
}); 

scheduleSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Schedule', scheduleSchema);

