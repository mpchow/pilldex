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
      return {user: await Profile.findOne({userId: profileParams.query.userId}), msg: 'Success'};
   }
   catch (error) {
      throw `The User ${profileParams.userId} could not be retrieved`;
  }
}

/* 
 * Create a new profile
 */
const create = async (profileParams) => {
   try {
      await Profile.findOne({ userId: profileParams.userId})
      const profile = new Profile(profileParams);
      profile.save();
      return({msg: 'Success'});
   }
   catch (error) {
      throw 'The user ' + profileParams.userId + ' is already in the database';
   }
}

/* 
 * Update a user's profile
 * profileParams.userId = userId of target user
 */
const update = async (profileParams) => {
   try {
      await Profile.findOneAndUpdate({userId: profileParams.userId}, profileParams);
      return {msg: 'Success'};
   }
   catch (error) {
      throw `The profile for ${profileParams.name} could not be updated`;
   }
}

/* 
 * Remove a user's profile 
 * profileParams.userId = userId of target user
 */
const remove = async (profileParams) => {
   try {
      await Profile.deleteOne({userId: profileParams.userId});
	   await Pill.deleteMany({userId: profileParams.userId});
      return {msg: 'Success'};
   }
   catch (error) {
      throw `The profile for ${profileParams.name} could not be removed`;
   }

}

module.exports = {create, update, remove, retrieve};
