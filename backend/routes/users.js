const express = require('express');
const router = express.Router();
const profileService = require('./../modules/profile.js');
const notifService = require('./../pushNotification/notifications.js');

// Routes
router.post('/', newUser);
router.put('/', updateUser);
router.delete('/', deleteUser);
router.get('/', getNotification);
router.get('/', getUser);

function getUser(req, res, next) {
	profileService.retrieve(req.body)
		.then((user) => res.json(user))
		.catch(err => next(err));
}

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
	const payload = {
		notification: {
			title: "Test Notification!",
			body: "HI FRIEND - This is a new notification!",
			priority: 'high',
		}
	 };

	notifService.sendNotification(req.body, payload)
		.then((success) => res.json(success))
		.catch(err => next(err));
}

module.exports = router;
