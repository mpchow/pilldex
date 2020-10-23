const express = require('express');
const router = express.Router();
const profileService = require('./../modules/profile.js');
const notifService = require('./../pushNotification/notifications.js');

// Routes
router.post('/', newUser);
router.put('/', updateUser);
router.delete('/', deleteUser);
router.get('/', getNotification);

function newUser(req, res, next) {
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
	profileService.remove(req.body) 
		.then((success) => res.json(success))
		.catch(err => next(err));
}

function getNotification(req, res, next) {
	var message = JSON.parse('{ "message":"Testing a push notification"}');
	notifService.sendNotification(req.body, message)
		.then((success) => res.json(success))
		.catch(err => next(err));
}

module.exports = router;
