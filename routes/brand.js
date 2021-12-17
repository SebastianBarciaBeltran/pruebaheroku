/*
    PATH '/api/brands'
*/ 
// IMPORTS
const { Router }  = require('express');
const { check } = require('express-validator');

// ROUTER
const router = Router();

// CONTROLLERS
const brand = require('../controllers/brand');

// MIDDLEWARES
const { validJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

/**
 * RUTA PARA OBTENER TODAS LAS MARCAS
 */
router.get( '/', validJWT, brand.getBrands);

/**
 * RUTA PARA CREAR UNA MARCA
 */
router.post('/', [
    validJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatorio').not().isEmpty(),
    validarCampos
  ],
   brand.setBrand);

/**
 * RUTA PARA ACTUALIZAR UNA NUEVA MARCA
 */
 router.put('/:id', [
    validJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatorio').not().isEmpty(),
    validarCampos
  ],
   brand.updateBrand);

/**
 * RUTA PARA ELIMINAR UNA MARCA
 */
router.delete('/:id', validJWT, brand.deleteBrand);

/**
 * RUTA PARA obtener una marca por id
 */
router.get('/:id', validJWT, brand.getBrandById);



module.exports = router;

