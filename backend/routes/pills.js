var express = require('express');
var router = express.Router();

router.post('/', newPill);
router.get('/', getPill);
router.put('/', updatePill);
router.delete('/', deletePill);

///* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

function newPill(req, res, next) {
  res.send('respond with a resource');
}

function getPill(req, res, next) {
  res.send('Get Pill endpoint');
}

function updatePill(req, res, next) {
  res.send('respond with a resource');
}

function deletePill(req, res, next) {
  res.send('respond with a resource');
}

module.exports = router;
