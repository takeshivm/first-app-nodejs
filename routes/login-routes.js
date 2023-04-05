var express = require('express');
var router = express.Router();
var passort = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/users');

passort.serializeUser((user, done) => {
    done(null, user.id);//todo #2 Serializamos usando id
});

passort.deserializeUser((id, done) => {
    User.findByid(id, (error, user) => {
        done(error, user[0]);//No olvidar, tenemos que acceder a la posición 0 del array
    });
    //todo #3. Con esto sabrá si el usuario ess el correcto y, va a poder establecer la información en sesion
});
// Todo. Este el prroceso de passport para llevar a cabo la autenticacion
router.get('/login', (req, res, next) => {
    res.render('login', {
        title: 'Login passport y mysql',
        message: req.flash('error')
    });
});

passort.use(new localStrategy(
    (username, password, done) => {
        User.findOne(username, password, (error, user) => {
            if (error) {
                return done(error);
            }
            if ( ! user ) {
                return  done(null, false, {message: 'El usuario no ha sido identificado'});
            }
            return done(null, user); //todo #1 cuando todo va bien aqui, procede a serializar al usarioo
        });
    }
));
//Es todo lo que tenemos que configurar para tener assport y con local strategy funcionando

//Creamos la ruta para iniciar sesion

router.post('/login',
    passort.authenticate('local', {
        failureRedirect: '/login-routes/login', failureFlash: true
    }),//Lo anterior, se ejecuta antes cualqquier error
    (req, res) => {
        console.log('Todo bien');
        //res.json(req.user);//Se eejecuta, si todo ha ido bien
        res.redirect(`/login-routes/users/${req.user.id}`);//Todo, reemplazamos lo anterior por esto
    }
);

router.get('/users/:id', (req, res, next) => {
    res.render('user', {
        title: `Bienvenido ${req.user.username}`
    });
});

router.get('/logout', (req, res, next) => {
    if (req.user) {
        req.logout;//Si el usuario esta autenticadoo, entonces, cerramos la sesion
    }
    res.redirect('/login-routes/login');
});

module.exports = router;
