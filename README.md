# API Rest con Node.js

Esta es una API Rest desarrollada con Node.js que utiliza las siguientes tecnologías:

- Express.js: framework de Node.js para el desarrollo de aplicaciones web.
- MySQL: sistema de gestión de bases de datos relacionales.
- Passport.js: middleware para la autenticación de usuarios.
- Nodemailer: módulo de Node.js para enviar correos electrónicos.
- XML2JS: librería de Node.js para convertir entre XML y JSON.
- Y otras dependencias que puedes encontrar en el archivo package.json.

## Requisitos

Antes de comenzar, asegúrate de tener instalado Node.js (versión 16.14.0 o superior) y MySQL en tu sistema.

## Instrucciones

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/takeshivm/first-app-nodejs.git
    ```

2. Instala las dependencias del proyecto:

    ```bash
    cd first-app-nodejs
    npm install
    ```

3. Crea una base de datos en MySQL y configura las credenciales en el archivo `config/config.json`.

4. Ejecuta el siguiente comando para crear las tablas necesarias en la base de datos:

    ```bash
    npm run migrate
    ```

5. Ejecuta el servidor de desarrollo:

    ```bash
    npm start
    ```

La API estará disponible en http://localhost:3000.


## Contribuir

Si deseas contribuir a este proyecto, por favor sigue las siguientes recomendaciones:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/MyFeature`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Añade mi función'`).
4. Haz push a la rama (`git push origin feature/MyFeature`).
5. Abre un pull request.

