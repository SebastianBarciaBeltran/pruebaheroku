// IMPORTS
const express    = require('express');
const cors       = require('cors');

// DB
const { dbConnection } = require('./db/config');

// PARA LAS VARIABLES DE ENTORNO
require('dotenv').config();

// CREAMOS EL SEVIDOR/APP DE EXPERSS
const app = express(); 

// CORS
app.use( cors() );

// CONEXION A LA BD
dbConnection();

// DIRECTORIO PUBLICO
app.use( express.static('public'));


// MIDDLEWARE PARA PODER LEER LA INFORMACION DEL BODY
app.use( express.json());

// --- CONFIGURAMOS LAS RUTAS

// RUTAS reparando 
app.use( '/api/users',           require( './routes/users'   ));
app.use( '/api/products',        require( './routes/product' ));
app.use( '/api/brands',          require( './routes/brand'   ));
app.use( '/api/all',             require( './routes/search'  ));
app.use( '/api/login',           require( './routes/auth'    ));
app.use( '/api/uploads/',        require('./routes/uploads') );
app.use( '/api/contactMessage/', require('./routes/contactMessage') );

// ---  LEVANTAMOS LA APP DE EXPRESS --- //
app.listen( process.env.PORT , () => {
    console.log(`Servidor corriendo en puerto ${ 4000 }`) 
});