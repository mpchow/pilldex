const mongoose = require('mongoose');
const Schema = mongoose.Scheme;

// https://stackoverflow.com/questions/29780733/store-an-image-in-mongodb-using-node-js-express-and-mongoose
const pillSchema = new Schema({
	name: {type: String, required: true},
	userId: {type: String, required: true},
	totalQuantity: {type: Number, required: true},
	frequency: {type: Number, required: true},
	frequencyUnit: {type: String, required: true},
	dosage: {type: Number, required: true}, 
	withFood: {type: Boolean, required: false},
	withSleep: {type: Boolean, required: false},
	image: { data: Buffer, contentType: String}
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
