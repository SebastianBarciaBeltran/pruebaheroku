/*
    PATH '/api/newsletter'
*/ 
// IMPORTS
const { Router }  = require('express');
const { check } = require('express-validator');

// ROUTER
const router = Router();

// CONTROLLERS
const newsletter = require('../controllers/newsletter');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validJWT } = require('../middlewares/validar-jwt');


/**
 * RUTA PARA QUE LAS PERSONAS QUE NO SON USERS SE REGISTREN A LA NEWSLETTER
 */
router.post('/', [
    validJWT,
    check('email', 'El email es obligatorio').isEmail(),
], validarCampos, newsletter.setUserToNewsLetter );
router.get('/users',   validJWT, newsletter.getUsersNewsletter );
router.get('/clients', validJWT, newsletter.getClientsNewsLetter );



module.exports = router;

