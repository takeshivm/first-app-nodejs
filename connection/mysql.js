const mysql = require('mysql');
//Creamos la conexion, la cual recive un objeto con los sigts valores
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'first-app-nodejs'
});

//Con esto ya podemos usar esta conexion desde cualquier sitio
module.exports = conn;