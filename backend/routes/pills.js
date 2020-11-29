/* Routes for the pill module */
const express = require('express');
const router = express.Router();
const pillService = require('./../modules/pill.js');
const labelService = require('./../modules/label.js');
const scheduler = require('./../modules/manageSchedule.js');

router.post('/', newPill);
router.get('/', getPills);
router.put('/', updatePill);
router.delete('/', deletePill);
router.get('/single', getPillById);
router.post('/label', parseLabel);
router.post('/refill', refill);
router.post('/taken', pillTaken);

module.exports = router;

/* Decrement the number of capsules remaining */
function pillTaken(req, res, next) {
//	console.log("In PILLTAKEN route");
	pillService.updateTaken(req.body)
		.then((success) => res.json(success))
}

/* Increment the number of capsules remaining 
 * by the totalQuantity provided in a refill
 */
function refill(req, res, next) {
 //   console.log("In REFILL Route");
	 console.log(req.body.userId);
    pillService.updateRemaining(req.body)
        .then(pill => res.json(pill))
}

/* Parse the text of the pill's label 
 * Returns a pill object with its fields filled 
 * with predicted values based on the label text 
 */
function parseLabel(req, res, next) {
//	console.log("In PARSELABEL Route");
	labelService.parseLabel(req.body)
		.then((pillData) => res.json(pillData))
}

/* Creates a new pill and saves it to the database */
function newPill(req, res, next) {
//	console.log("In NEWPILL Route");
	pillService.create(req.body) 
		.then((success) => res.json(success))
}

/* Returns all the pills of the target user */
function getPills(req, res, next) {
//	console.log("In GETALLPILL Route");
	pillService.retrieveAll(req) 
		.then(pills => {res.json(pills);})
}

/* Returns the pill associated with the provided userId and pillName */
function getPillById(req, res, next) {
//	console.log("In GETPILL Route");
	pillService.retrieve(req) 
		.then(pill => res.json(pill))
}

/* Updates the pill's fields */
function updatePill(req, res, next) {
//	console.log("In UPDATEPILL Route");
	pillService.update(req.body) 
		.then((success) => res.json(success))
}

/* Deletes the pill from the db */
function deletePill(req, res, next) {
//	console.log("In DELETEPILL Route");
	pillService.remove(req.body) 
		.then((success) => res.json(success))
}

