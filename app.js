var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
var form = require('express-form2');
var i18n = require('i18n');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// Luego de importar, configuramos debajo de las sesiones

//añadimos el hbs
var hbs = require('hbs');
//El directorio donde vamos a tener los archivos partials y con esto
// ya está todo configurado para que los archivos partials sean encontrador por hbs
var hbsUtils = require('hbs-utils')(hbs);
hbsUtils.registerPartials(`${__dirname}/views/partials`);//reemplazmos hbs por hbsUtils
hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`);//reemplazmos hbs por hbsUtils
//reemplazmos hbs por hbsUtils
// Lo que hace, todos los cambias que hagamos en el partial
// se van a ver reflejados en el navegador de forma automatica

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var invoices = require('./routes/invoices');
var middleware_routes = require('./routes/middleware-routes');
var filesystem_routes = require('./routes/filesystem-routes');
var query_strings = require('./routes/query-strings');
var session_routes = require('./routes/session-routes');
var session_flash_routes = require('./routes/session-flash-routes');
var users_mysql_routes = require('./routes/users-mysql-routes');
var form_validation_routes = require('./routes/form-validation-routes');
var login_routes = require('./routes/login-routes');
var api_rest_users_mysql_routes = require('./routes/api-rest-users-mysql');
var xml_routes = require('./routes/xml-routes');
var multer_routes = require('./routes/multer-routes');
var i18n_routes = require('./routes/i18n-routes');
var nodemailer_routes = require('./routes/nodemailer-routes');
var response_multiple_formats_routes = require('./routes/response-multiple-formats-routes');

var app = express();

//Multilenguaje
i18n.configure({
  locales: ['es', 'en'],
  cookie: 'secret-lang',
  directory: __dirname + '/locales',
  default: 'es'
});

// view engine setup
// Establecemos el motor de vista que vamos a utuilizar, handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');//handlebars

// Mapeamos algunos directorios, usamos objectos para configuraicion necesaria
/* Para que la app funcione
* */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Manejo de sessiones
app.use(session({
  secret: '<ug1pbm*{5}ZR>M4Sp}2tje1*Q"5NM',
  name: 'super-secret-cookie-name',
  resave: true,
  saveUninitialized: true
}));//Los 2 ultm. params, siver para no tener errores en la consola
//Y con solo esto, ya podemos trabajar con sesiones

// Ya tenemos disponible el trabajo de sesiones flash en toda la aplicacion
app.use(flash());

app.get('/locale/:lang', (req, res, next) => {
  res.cookie(
      'secret-lang',
      req.params.lang
  );
  res.redirect('/i18n-routes');
});

app.use(i18n.init);

app.use(passport.initialize());
app.use(passport.session());
//Con esto ya podremos empezar a trabajar con passport

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
}); // Con esto ya tendremos a user disonible en todas las templates

/* Bower, lo que le estamos diciendo es que cuando este dentro de '/components',
  mapee el directorio, que es donde vamos a servir los archivos estaticos
 */
app.use('/components', express.static(`${__dirname}/public/components`));

// Usamos rutas '/' cuandon estemos en al raiz de la app, se ejecute el archivo indexRouter
app.use('/', indexRouter); //Line 7
app.use('/users', usersRouter);

//Con esto vamoos a interceptar todos los verbos http
// '/invoices/*' el asterico significa cualquier cosa
// Tener en cuenta que debemos aplicarlo antes de la ruta que vamos a usar
app.all('/invoices/*', (req, res, next) => {
  if( ! req.headers['api-key']) {
    res.status(200).json('Api key is mandatory');
    return;
  }
  next();
});

app.use('/invoices', invoices);
app.use('/middleare-routes', middleware_routes);
app.use('/filesystem-routes', filesystem_routes);
app.use('/query-strings', query_strings);
app.use('/session-routes', session_routes);
app.use('/session-flash-routes', session_flash_routes);
app.use('/users-mysql-routes', users_mysql_routes);
app.use('/form-validation-routes', form_validation_routes);
app.use('/login-routes', login_routes);
app.use('/api-rest-users-mysql', api_rest_users_mysql_routes);
app.use('/xml-routes', xml_routes);
app.use('/multer-routes', multer_routes);
app.use('/i18n-routes', i18n_routes);
app.use('/nodemailer-routes', nodemailer_routes);
app.use('/response-multiple-formats-routes', response_multiple_formats_routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
