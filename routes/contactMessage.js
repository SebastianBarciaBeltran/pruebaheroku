/*
    PATH '/api/contactMessage'
*/

// IMPORTS
const { Router }  = require('express');

//ROUTER
const router = Router();

// CONTROLLERS
const nodemailer = require('../controllers/contactMessage');

// MIDDLEWARES
const { validJWT } = require('../middlewares/validar-jwt');
// const { validarCampos } = require('../middlewares/validar-campos');

/**
 * RUTA PARA ENVIAR UN MESAJE A LA PERSONA QUE CONTACTA 
 */
router.post('/', nodemailer.sendContactEmail);

/**
 * RUTA PARA OBTENER TODAS LAS PERSONAS QUE HAN CONTACTADO POR LA WEB
 */
router.get('/', validJWT, nodemailer.getCotacts);


router.delete('/:id', validJWT ,nodemailer.deleteContact);


// EXPORTAMOS PARA SU USO EN OTRO LUGAR
module.exports = router;

