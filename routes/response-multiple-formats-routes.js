var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.format({
        text: () => {
            res.send('Hola');
        },
        html: () => {
            res.send('<p>Hola</p>');
        },
        json: () => {
            res.send({message: 'Hola'});
        },
        xml: () => {
            res.send('<user><username>Takeshi</username><edad>28</edad><profesion>Programador</profesion></user>');
        },
        default: () => {
            res.status(406).send('Formato no aceptado');
        },
    })
});

module.exports = router;