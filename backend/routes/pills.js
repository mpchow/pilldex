var express = require('express');
var pill = require('../modules/pill');
var router = express.Router();

router.post('/', newPill);
router.get('/', getPill);
router.put('/', updatePill);
router.delete('/', deletePill);


function newPill(req, res, next) {
  res.send(pill.create(req.body));
}

function getPill(req, res, next) {
  res.send(pill.retrieve(req.body));
}

function updatePill(req, res, next) {
  res.send(pill.update(req.body));
}

function deletePill(req, res, next) {
  res.send(pill.remove(req.body));
}

module.exports = router;
