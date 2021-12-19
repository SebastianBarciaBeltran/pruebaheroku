/*
    PATH '/api/blogs'
*/ 
// IMPORTS
const { Router }  = require('express');
const { check } = require('express-validator');

// ROUTER
const router = Router();

// CONTROLLERS
const blog = require('../controllers/blog');

// MIDDLEWARES
const { validJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

/**
 * RUTA PARA OBTENER TODAS LAS ENTRADAS DEL BLOG
 */
router.get( '/', blog.getBlogs);

/**
 * RUTA PARA CREAR UNA ENTRADA DE BLOG
 */
router.post('/', [
    validJWT,
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatorio').not().isEmpty(),
    validarCampos
  ], blog.setBlog );

/**
 * RUTA PARA ACTUALIZAR UNA NUEVA MARCA
 */
 router.put('/:id', [
    validJWT,
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatorio').not().isEmpty(),
    validarCampos
  ],
   blog.updateblog);

/**
 * RUTA PARA ELIMINAR UNA MARCA
 */
router.delete('/:id', validJWT, blog.deleteblog);

/**
 * RUTA PARA OBTENER UN BLOG POR ID
 */
router.get('/:id', blog.getBlogById);



module.exports = router;

