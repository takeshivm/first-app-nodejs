var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json(req.session.username || "No existe la sesión");
});

router.get('/create', (req, res, next) => {
    req.session.username = "Vargas";
    res.redirect('/session-routes');
});

//Eliminamos la sesion
router.get('/remove-key', (req, res, next) => {
    req.session.username = null;
    res.redirect('/session-routes');
});

//Si quisieramos eliminar toda la sesion
router.get('/destroy', (req, res, next) => {
    req.session.destroy();
    res.redirect('/session-routes');
});



module.exports = router;