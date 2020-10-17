var express = require('express');
var profile = require('../modules/profile');
var router = express.Router();

// Routes
router.post('/', newUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

function newUser(req, res, next) {
  res.send(profile.create(req.body));
}

function updateUser(req, res, next) {
  res.send(profile.update(req.body));
}

function deleteUser(req, res, next) {
  res.send(profile.remove(req.body));
}

module.exports = router;
