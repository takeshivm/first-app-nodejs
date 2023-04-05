//Lo primero que hay que hacer siempre en un archivo de ruta
var express = require('express');
var router = express.Router();

router
    .get('/', (req,res,next) => {
        res.json(200, 'Obtener todas las facturas');
    })//Obtener todas las facturas
    .get('/:invoice', (req, res, next) => {
        res.json(200, 'obtener la factura ' + req.params.invoice);
    })// Crear una nueva factura, express la resuelve de forma automatica
    .post('/', (req, res, next) => {
        //Los datos que vienen estan dentro de, req.body
        res.json(req.body);
    })//con 1 parametro
    .patch('/:invoice', (req, res, next) => {
        res.json({body: req.body, params: req.params});
    })//igual con 1 parametro
    .delete('/:invoice', (req, res, next) => {
        res.json(200, 'Eliminar la factura ' + req.params.invoice);
    });

module.exports = router;
