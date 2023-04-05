var express = require('express');
var router = express.Router();



router.get('/user-info', (req, res, next) => {
    let data = {};
    if (req.query.user){
        data.user = req.query.user;
    }

    if (req.query.job){
        data.job = req.query.job;
    }

    if (req.query.hobbies){
        data.hobbies = JSON.parse(req.query.hobbies);
    }

    res.status(200).json(data);

});


module.exports = router;