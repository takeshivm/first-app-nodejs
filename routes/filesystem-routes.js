var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/folders', (req, res, next) => {
    let files = [];

    fs.readdirSync('C:/Users/takes/nodejs-projects/first-app-nodejs').filter((file) => {
        files.push(file);
    });
    res.status(200).json(files);
});

router.get('/files', (req, res, next) => {
   fs.readFile('app.js', "utf8", (err, data) => {
       if (err){
           res.status(500).send(err);
       }
       res.status(200).send(data);
   });
});

router.get('/write', (req, res, next) => {
    fs.writeFile('test.js', 'console.log("pruebas")', err => {
        if (err){
            res.status(500).send(err);
        }
        res.status(200).json("El archivo erroe se ha creado");
    });
});

module.exports = router;