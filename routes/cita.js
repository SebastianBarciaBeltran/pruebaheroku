/*
    PATH '/api/citas'
*/ 
// IMPORTS
const { Router }  = require('express');
const { check } = require('express-validator');

// ROUTER
const router = Router();

// CONTROLLERS
const cita = require('../controllers/cita');

// MIDDLEWARES
const { validJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

/**
 * RUTA PARA OBTENER TODAS LAS CITAS
 */
router.get( '/', cita.getCitas );

/**
 * RUTA PARA CREAR UNA CITA
 */
router.post('/', [
    check('title', 'El nombre es obligatorio').not().isEmpty(),
    check('start', 'El inicio es obligatorio').not().isEmpty(),
    validarCampos
  ], cita.setCita );

/**
 * RUTA PARA ELIMINAR UNA MARCA
 */
router.delete('/:id', validJWT, cita.deleteCita);




module.exports = router;

