const db = require('./../db/db.js');
const Pill = db.Pill;

const create = async (pillParams) => {
   try {
      await Pill.findOne({ name: pillParams.name, userId: pillParams.userId })
      const pill = new Pill(pillParams);
      pill.save();
      return({msg: 'Success'});
   }
   catch (error) {
      throw 'The Pill ' + name + ' is already in the pilldex';
   }
}

const update = async (pillParams) => {
   try {
      await Pill.replaceOne({name: pillParams.name, userId: pillParams.userId}, pillParams);
   }
   catch (error) {
      throw `The Pill ${pillParams.name} could not be updated`;
   }
}

const remove = async (pillParams) => {
   try {
      await Pill.deleteOne({name: pillParams.name, userId: pillParams.userId});
   }
   catch (error) {
      throw `The Pill ${pillParams.name} could not be deleted`;
   }  
   return({msg: 'Success'});
}

const retrieve = async (pillParams, one) => {
   if(one) {
      try {
         return {pill: await Pill.findOne({name: pillParams.name, userId: pillParams.userId}), msg: 'Success'};
      }
      catch (error) {
         throw `The Pill ${pillParams.name} could not be retrieved`;
      }
   }
   else {
      try {
         return {pill: await Pill.find({userId: pillParams.userId}), msg: 'Success'};
      }
      catch (error) {
         throw `The Pills for ${pillParams.userId} could not be retrieved`;
      }
   }
}

module.exports = {create, update, remove, retrieve};

// {name, userId, totalQuantity, frequency, 
//    frequencyUnit, dosage, withFood, withSleep
