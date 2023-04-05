var express = require('express');
var router = express.Router();
const Email = require('../config/email');

const hbs = require('nodemailer-express-handlebars');
const path = require('path');

router.get('/basic', (req, res, next) => {
    let message = {
        to: 'takeshi13x@gmail.com',
        subject: 'Email con nodemailer',
        html: '<p> Hola con nodemailer + expressjs </p>'
    }

    Email.transporter.sendMail(message, (error, info) => {
        if (error) {
            res.status(500).send(error.message);
            return;
        }
        Email.transporter.close();
        res.send('Respuesta del servidor "%s"' + info.response);
    })
});

router.get('/attachment', (req, res, next) => {
  
    let message = {
        to: 'takeshi13x <takeshi13x@gmail.com>',
        subject: 'Nodemailer attachment ',
        html: '<p> Hola con nodemailer + expressjs </p><p><img src="cid:nodejs-course" /></p>',
        attachments: [
            {
                filename: 'Foto-carnet.jpg',
                path: __dirname + '/../uploads/Foto-carnet.jpg',
                cid: 'nodejs-course' //Esto sive para embeber la imagen en el html de la linea 28
            },
            {
                filename: 'Recibo-por-certificado.JPG',
                path: __dirname + '/../uploads/Recibo-por-certificado.JPG'
            }
        ]
    }

    Email.transporter.sendMail(message, (error, info, ) => {
      if (error) {
          console.log('Error ocurred');
          res.status(500).send(error.message);
          return;
        }
        Email.transporter.close();
        res.send('Respuesto del servidor: ' + info.response);
    })

});  

router.get('/handlebars2', (req, res, next) => {
    console.log(__dirname, '../views/email-templates');
    Email.transporter.use('compile', hbs({
        //viewEngine: 'hbs', TODO: Esto daba problema, la solución fue modificar el viewEngine
        viewEngine: {
            extName: ".hbs",
            partialsDir: path.resolve(__dirname, "../views/email-templates"),
            defaultLayout: false,
          },
        //extName: '.hbs', TODO: No fue necesario agregar handlebars
        extName: '.hbs',
        viewPath: path.join(__dirname, '../views/email-templates')
    }));
    
    let message = {
        to: 'takeshi13x <takeshi13x@gmail.com>',
        subject: 'Nodemailer attachment ',
        template: 'test',
        context: {
            text: 'Hola con nodemailer + Expressjs'
        },
        attachments: [
            {
                filename: 'Foto-carnet.jpg',
                path: __dirname + '/../uploads/Foto-carnet.jpg',
                cid: 'nodejs-course' //Esto sive para embeber la imagen en el html de la linea 28
            },
            {
                filename: 'Recibo-por-certificado.JPG',
                path: __dirname + '/../uploads/Recibo-por-certificado.JPG'
            }
        ]
    }

    Email.transporter.sendMail(message, (error, info, ) => {
      if (error) {
          console.log('Error ocurred');
          res.status(500).send(error.message);
          return;
        }
        Email.transporter.close();
        res.send('Respuesto del servidor: ' + info.response);
    })
  // Your code here
});

module.exports = router;