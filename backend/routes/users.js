const express = require('express');
const router = express.Router();
const profileService = require('./../modules/profile.js');

// Routes
router.post('/', newUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

function newUser(req, res, next) {
	profileService.create(req.body) 
		.then(() => res.json({}))
		.catch(err => next(err));
}

function updateUser(req, res, next) {
	profileService.update(req.body) 
		.then(() => res.json({}))
		.catch(err => next(err));
}

function deleteUser(req, res, next) {
	profileService.remove(req.params.userId) 
		.then(() => res.json({}))
		.catch(err => next(err));
}

module.exports = router;
