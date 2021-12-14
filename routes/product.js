/*
    PATH '/api/products'
*/
// IMPORTS
const { Router }  = require('express');
const { check } = require('express-validator');

// ROUTER
const router = Router();

// CONTROLLERS
const product = require('../controllers/product');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validJWT }      = require('../middlewares/validar-jwt');

/**
 * RUTA PARA OBTENER TODOS LOS PRODUCTOS
 */
router.get( '/',  product.getProducts);

/**
 * RUTA PARA CREAR UN NUEVO PRODUCTO 
 */
router.post('/', [
        validJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('references', 'La referencia es obligatorio').not().isEmpty(),
        check('type', 'El tipo es obligatorio').not().isEmpty(),
        check('form', 'La forma es obligatorio').not().isEmpty(),
        check('colorCristal', 'El colorCristal es obligatorio').not().isEmpty(),
        check('colorMontura', 'El colorMontura es obligatorio').not().isEmpty(),
        check('gender', 'El gender es obligatorio').not().isEmpty(),
        check('brand', 'El id de marca debe ser valido').isMongoId(),
        validarCampos
    ], product.setProduct);

/**
 * RUTA PARA ACTUALIZAR UN PRODUCTO 
 */
router.put('/:id', [
        validJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('references', 'La referencia es obligatorio').not().isEmpty(),
        check('type', 'El tipo es obligatorio').not().isEmpty(),
        check('form', 'La forma es obligatorio').not().isEmpty(),
        check('colorCristal', 'El colorCristal es obligatorio').not().isEmpty(),
        check('colorMontura', 'El colorMontura es obligatorio').not().isEmpty(),
        check('gender', 'El gender es obligatorio').not().isEmpty(),
        check('brand', 'El id de marca debe ser valido').isMongoId(),
        validarCampos
    ], product.updateProduct);

/**
 * RUTA PARA ELIMINAR UN PRODUCTO POR SI ID
*/
router.delete('/:id', validJWT, product.deleteProduct );

// EXPORTAMOS PARA SU USO EN OTRO LUGAR
module.exports = router;