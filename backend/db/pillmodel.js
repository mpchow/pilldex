const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// https://stackoverflow.com/questions/29780733/store-an-image-in-mongodb-using-node-js-express-and-mongoose
const pillSchema = new Schema({
	name: {type: String, unique: true, required: true},
	userId: {type: String, required: true},
	totalQuantity: {type: Number, required: true},
	frequency: {type: Number, required: true},
	frequencyUnit: {type: String, required: true},
	dosage: {type: Number, required: true}, 
	withFood: {type: Boolean, required: true},
	withSleep: {type: Boolean, required: true},
	image: { data: Buffer, contentType: String, required: false}
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
