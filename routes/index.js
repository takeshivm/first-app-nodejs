var express = require('express');
var router = express.Router();

/* GET home page.
* Contiene una ruta, usando Router, que carga un template que se llama index
  ,* ubicado en el Dir.views/indecx.hbs*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express First App' });
});

router.get('/first page', function (req,res,next){
  res.json([{msg: 'First page'}]);
});

router.get('/first-layout', function (req,res,next) {
  //Le decimos al render el archivo de vista que vamos a utilizar, y creamos el archivo .hbs
  // dentro de la carpeta views
  res.render('first-layout', {
    //abrimos un objecto para pasarle datos
    title: 'FirstLayout de prueba',
    page: 'Variable Page 1',
    layout: 'handlebars-layout'//Este archivo lo detecta de forma automatica
  })//Luego como ya tenemos la variable page disponible, vamos al archivo first-layout.hbs y añadimos la variable page
  //Ingresamos al navegador y vamos s la ruta /first-layout
});

router.get('/handlebars', (req, res, next) => {
  res.render('handlebars', {
    // Array de objetos de Usuarios
    users: [
        {id: 1, name: 'Leonardo'},
        {id: 2, name: 'Da Vinci'}
    ],
    owner: {
      firstName: 'Roberto',
      lastName: 'Galvez'
    },
    takeshi: {
      firstName: 'Roberto',
      lastName: 'Galvez'
    },
    appName: 'Miprimerblog',
    layout: 'handlebars-layout'
  })
});

module.exports = router;
