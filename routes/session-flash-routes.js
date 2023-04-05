var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.send(req.flash('info'));
    //Si las sesiones existen, la veremos en la pantalla, sino, no pasa nada
});

router.get('/create', (req, res, next) => {
   req.flash('info', 'Sesion flash info creada');
   res.redirect('/session-flash-routes');
});


module.exports = router;