var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('i18n', {
        title: 'i18n'
    });
});

module.exports = router;
