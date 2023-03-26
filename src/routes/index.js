var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/signup', authController.signup);

module.exports = router;
