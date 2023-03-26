var express = require('express');
var router = express.Router();

/* GET profile */
router.get('/', (req, res, next) => {
    res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.headers.authorization,
    });
});

module.exports = router;
