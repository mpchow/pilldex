/* User Module - contains all function related to a user/profile */

const db = require('./../db/db.js'); 
const Profile = db.User;
const Pill = db.Pill;

/* 
 * Get user's profile
 * profileParams.query.userId = userId of target user
 */
const retrieve = async (profileParams) => {
	try {
		let user = await Profile.findOne({userId: profileParams.query.userId});	
		if (user === null)
			throw 'User Not Found';
      	return ({user: user, msg: 'Success'});
   }
   catch (error) {
		return ({msg: "User Not Found"});
  }
};

/* 
 * Create a new profile
 */
const create = async (profileParams) => {
	try {
		let user = await Profile.findOne({ userId: profileParams.userId})
		if (user !== null)
			throw "user already exists";

		const profile = new Profile(profileParams);
		profile.save();
		return({msg: 'Success'});
   }
   catch (error) {
		return ({msg: "User Already Exists"});
   }
};

/* 
 * Update a user's profile
 * profileParams.userId = userId of target user
 */
const update = async (profileParams) => {
	try {
		let user = await Profile.findOne({ userId: profileParams.userId });
		if (user === null)
			throw 'User Not Found';

      	await Profile.findOneAndUpdate({userId: profileParams.userId}, profileParams);
      	return ({msg: 'Success'});
   }
   catch (error) {
		return ({msg: "User Not Found"});
   }
};

/* 
 * Remove a user's profile 
 * profileParams.userId = userId of target user
 */
const remove = async (profileParams) => {
	try {
		console.log(profileParams.query.userId);
		let user = await Profile.findOne({ userId: profileParams.query.userId });
		if (user === null)
			throw 'User Not Found';
      	
		await Profile.deleteOne({userId: profileParams.query.userId});
		await Pill.deleteMany({userId: profileParams.query.userId});
		return ({msg: 'Success'});
			
	}	
	catch (error) {
		return ({msg: "User Not Found"});
	}

};

module.exports = {create, update, remove, retrieve};
