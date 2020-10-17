const mongoose = require('mongoose');
const connOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
//const connStr = "mongodb://localhost:27017/pilldex";
const connStr = "mongodb://ec2-3-15-141-16.us-east-2.compute.amazonaws.com:27017/pilldex";

mongoose.connect(connStr, connOptions);
mongoose.Promise = global.Promise;

const Pill = require('./pillmodel.js');
const User = require('./usermodel.js');

module.exports = {
	Pill, 
	User
};

