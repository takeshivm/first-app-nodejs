var express = require('express');
var router = express.Router();
var userModel = require('../models/users');

router.get('/all', (req, res, next) => {
    userModel.fetchAll((error, users) => {
        if (error) {
            return res.status(500).json(error);
        }
        res.render('users-list', {
            title: 'Listado de usuarios',
            users
        })
    });
});


module.exports = router;