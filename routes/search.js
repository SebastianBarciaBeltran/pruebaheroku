/*
    PATH '/api/all/'
*/
// IMPORTS
const { Router }  = require('express');

// ROUTER
const router = Router();

// CONTROLLERS
const search = require('../controllers/search');

// MIDDLEWARES
const { validJWT }      = require('../middlewares/validar-jwt');


/**
 * RUTA PARA UNA BUSQUEDA GENERAL 
 */
router.get( '/:term', validJWT , search.getAll );

/**
 * RUTA PARA BUSQUEDA DE
 */
router.get( '/colletion/:table/:term', validJWT , search.getColletionDocument );


module.exports = router;