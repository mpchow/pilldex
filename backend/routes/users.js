const express = require('express');
const router = express.Router();
const profileService = require('./../modules/profile.js');
const notifService = require('./../pushNotification/notifications.js');

// Routes
router.post('/', newUser);
router.put('/', updateUser);
router.delete('/', deleteUser);
router.get('/', getUser);

function getUser(req, res, next) {
	profileService.retrieve(req)
		.then(user => res.json(user))
		.catch(err => next(err));
}

function newUser(req, res, next) {
	console.log("Creating a new user");
	profileService.create(req.body) 
		.then((success) => res.json(success))
		.catch(err => next(err));
}

function updateUser(req, res, next) {
	profileService.update(req.body) 
		.then((success) => res.json(success))
		.catch(err => next(err));
}

function deleteUser(req, res, next) {
	console.log("DELETING USER");
	profileService.remove(req) 
		.then((success) => res.json(success))
		.catch(err => next(err));
}

module.exports = router;
