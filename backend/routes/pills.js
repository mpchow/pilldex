const express = require('express');
const router = express.Router();
const pillService = require('./../modules/pill.js');

router.post('/', newPill);
router.get('/', getPills);
router.put('/', updatePill);
router.delete('/', deletePill);
router.get('/:name', getPillById);

module.exports = router;


function newPill(req, res, next) {
	console.log("In NEWPILL Route");
	pillService.create(req.body) 
		.then(() => res.json({}))
		.catch(err => next(err));
}

function getPills(req, res, next) {
	console.log("In GETPILL Route");
	pillService.retreive() 
		.then(pills => res.json(pills))
		.catch(err => next(err));
}

function getPillById(req, res, next) {
	console.log("In GETPILL Route");
	pillService.retreive(req.params.name) 
		.then(pill => pill ? res.json(pill) : res.sendStatus(404))
		.catch(err => next(err));
}

function updatePill(req, res, next) {
	console.log("In UPDATEPILL Route");
	pillService.retreive(req.body) 
		.then(() => res.json({}))
		.catch(err => next(err));
}

function deletePill(req, res, next) {
	console.log("In DELETEPILL Route");
	pillService.retreive(req.body) 
		.then(() => res.json({}))
		.catch(err => next(err));
}

