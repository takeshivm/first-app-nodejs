var express = require('express');
var router = express.Router();

//Añadiremos 3 fucniones que estan asiganadas a constantes
/*
* Estas pueden ser funciones reutilizables que se pueden utilizar para
* comprobar cosas
* */
const mA = (req, res, next) => {
    console.log('MA');
    next();
};

const mB = (req, res, next) => {
    console.log('MB');
    next();
};

const mC = (req, res, next) => {
    res.send('MC');
};
// De estra forma podemos utilizar los middleware para controlar el uso en nuestras apicaciones
router.get('/', [mA, mB, mC]);

module.exports = router;