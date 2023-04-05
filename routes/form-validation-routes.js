var express = require('express');
var router = express.Router();
var form = require('express-form2');
const {json} = require("express");
const User = require("../models/users");
var bcrypt = require('bcrypt-nodejs');
var field = form.field;


router.get('/', (req, res, next) => {
    res.render("form-validation",
        {title: "validacion de formularios", errors: [], post: [], flash: req.flash('success')})
});

router.post(
    '/register',
    (req, res, next) => {
        req.body = JSON.parse(JSON.stringify(req.body));
        next();
    },
    form(
        field("username")
            .trim()
            .required("", "El %s es requeridoo").is( /^[a-z]+$/, 'El %s solo puede contener letras'),
        field('email')
            .trim()
            .required('', 'El campo %s es requerido')
            .isEmail('El formato del %s no es válido'),
        field('password')
            .trim()
            .required('', 'El campo %s es requerido')
            .minLength(6, 'El passowrrd no debe cotener menos de 6 carraccteres')
            .is( /^[0-9]+$/, 'El %s solo puede contener números'),
        field('confirm-password')
            .equals('field::password', 'Los password no coinciden')
    ),
    (req, res, next) => {
        if (!req.form.isValid ){
            res.render("form-validation",
                {title: "Validacion de formularion", errors: req.form.errors, post: req.body});
            console.log('Se presento un error');
        }
        else{

            const user = {
                id: null,
                username: req.body.username,
                //password: req.body.password, TODO: sin encritar (De prueba)
                password: bcrypt.hashSync(req.body.password),
                // Esto no va a encriptar el pass con bcrypt
                email: req.body.email
            };
            console.log('Ingresando usuario ....', user);

            User.insert(user, (error, id) => {
                console.log('Antes del siert id ', id);

                if (insertId) {
                    console.log('Se rrgistro usuario success ', id);
                    req.flash('success', 'Usuario registrado correctamente');
                    res.redirect('/form-validation-routes');
                }else{
                    res.status(500).json('Error guardando el usuario');
                }
            });

            //res.json('El form se ha procesado correctamente'); Quick class 22
        }
    }
);

module.exports = router;