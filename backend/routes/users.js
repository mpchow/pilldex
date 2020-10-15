var express = require('express');
var router = express.Router();

// Routes
router.post('/', newUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

function newUser(req, res, next) {
  res.send('respond with a resource');
}

function updateUser(req, res, next) {
  res.send('respond with a resource');
}

function deleteUser(req, res, next) {
  res.send('respond with a resource');
}

module.exports = router;
