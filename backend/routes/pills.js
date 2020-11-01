const express = require('express');
const router = express.Router();
const pillService = require('./../modules/pill.js');
const labelService = require('./../modules/label.js');
const scheduler = require('./../pushNotification/manageSchedule');

router.post('/', newPill);
router.get('/', getPills);
router.put('/', updatePill);
router.delete('/', deletePill);
router.get('/single', getPillById);
router.post('/label', parseLabel);
router.post('/refill', refill);
router.post('/taken', pillTaken);

module.exports = router;

function pillTaken(req, res, next) {
	console.log("In PILLTAKEN route");
	scheduler.updateSchedule(req.body)
		.then((success) => req.json(success))
		.catch(err => next(err));
}

function refill(req, res, next) {
    console.log("In REFILL Route");
    pillService.updateRemaining(req.body)
        .then(pill => res.json(pill))
        .catch(err => next(err));
}

function parseLabel(req, res, next) {
	console.log("In PARSELABEL Route");
	labelService.parseLabel(req.body)
		.then((pillData) => res.json(pillData))
		.catch(err => next(err));
}

function newPill(req, res, next) {
	console.log("In NEWPILL Route");
	pillService.create(req.body) 
		.then((success) => res.json(success))
		.catch(err => next(err));
}

function getPills(req, res, next) {
	console.log("In GETALLPILL Route");
	pillService.retrieveAll(req) 
		.then(pills => {res.json(pills);})
		.catch(err => next(err));
}

function getPillById(req, res, next) {
	console.log("In GETPILL Route");
	pillService.retrieve(req) 
		.then(pill => res.json(pill))
		.catch(err => next(err));
}

function updatePill(req, res, next) {
	console.log("In UPDATEPILL Route");
	pillService.update(req.body) 
		.then((success) => res.json(success))
		.catch(err => next(err));
}

function deletePill(req, res, next) {
	console.log("In DELETEPILL Route");
	pillService.remove(req.body) 
		.then((success) => res.json(success))
		.catch(err => next(err));
}

