var conn = require('../connection/mysql');
var bcrypt = require('bcrypt-nodejs');

let User = {};

User.fetchAll = (callback) => {
    if (conn) {
        const sql = "Select * FROM users";
        conn.query(sql, (error, rows) => {
            if (error) {
                return callback(error);
            }
            return callback(null, rows);
        });
    }
    else
    {
        return callback("No se ha podido conectar");
    }
}

User.insert = (user, callback) => {
    if (conn) {
        console.log('Conectado BD');
        conn.query('INSERT INTO users SET ?', [user], (error, result) => {
           if (error) {
               return callback;
           }
            console.log('Registrado BD');

        });
    }else{
        console.log('Error BD');

        return callback('No se ha podido insertar');
    }
}

User.findByid = (id, callback) => {
    if (conn) {
        conn.query("SELECT * FROM users WHERE id = ?", [id], (error, row) => {
            if (error) {
                return callback(error);
            }
            else
            {
                return callback(null, row);
            }
        });
    }
}

User.findOne = (username, password, callback) => {
    if (conn) {
        conn.query(
            `SELECT * FROM users WHERE username = ${conn.escape(username)}`,// AND password = ${conn.escape(password)}`,
            (error, rows) => {
                if (error) {
                    return callback(error);
                }
                if (rows.length === 0 ) {
                    return callback(null, null);// El usuario no se ha autenticcado correctamente
                }
                return callback(null, rows[0]);

                var check = bcrypt.compareSync(password, rows[0].password); // true

                if (check) {
                    return callback(null, rows[0]);
                }
                return callback(null, null);// El usuario no se ha autenticcado correctamente
            }
        )
    }
}

User.update = (user, callback) => {
    if (conn) {
        conn.query('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?',
            [user.username, user.email, bcrypt.hashSync(user.password), user.id],
            (error, result) => {
                if (error) {
                    return callback('Error actualizand usuario');
                }
                return callback(null, 'Usuario actualizado');
            }
            )
    }
}

User.remove = (id, callback) => {
    if (conn) {
        conn.query('DELETE FROM users WHERE id = ?',
            [id],
            (error, result) => {
                if (error) {
                    return callback('Error eliminando usuario');
                }
                return callback(null, 'Usuario eliminadoo');
            }
        )
    }
}

User.response = (res, error, data) => {
    if (error) {
        res.status(500).json(error);
    }
    else{
        res.status(200).json(data);
    }
}


module.exports = User;