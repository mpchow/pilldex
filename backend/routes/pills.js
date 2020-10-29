const express = require('express');
const router = express.Router();
const pillService = require('./../modules/pill.js');

router.post('/', newPill);
router.get('/', getPills);
router.put('/', updatePill);
router.delete('/', deletePill);
router.get('/single', getPillById);
router.post('/label', parseLabel);

module.exports = router;

function parseLabel(req, res, next) {
	console.log("In PARSELABEL Route");
	pillService.parseLabel(req.body)
		.then((success) => res.json(success))
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
	pillService.retrieveAll(req.body) 
		.then(pills => {res.json(pills);})
		.catch(err => next(err));
}

function getPillById(req, res, next) {
	console.log("In GETPILL Route");
	pillService.retrieve(req.body) 
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

