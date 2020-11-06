/* Connects to the mongodb database */

const mongoose = require('mongoose');
const connOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
//const connStr = "mongodb://localhost:27017/pilldex";
const connStr = "mongodb://0.0.0.0:27017/pilldex";

// Connect to the local databse
mongoose.connect(connStr, connOptions);
mongoose.Promise = global.Promise;

// Get the pill and user schemas
const Pill = require('./pillmodel.js');
const User = require('./usermodel.js');

module.exports = {
	Pill, 
	User
};

