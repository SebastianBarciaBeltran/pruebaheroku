/*
    PATH '/api/users'
*/
// IMPORTS
const { Router } = require('express');
const { check }  = require('express-validator');

// ROUTER
const router = Router();

// CONTROLLERS
const userController = require('../controllers/users');

//MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validJWT }      = require('../middlewares/validar-jwt');


// --- RUTAS --- //
// RUTA PARA OBTENER TODOS LOS USUARIOS
router.get( '/', validJWT ,userController.getUsers );

// RUTAS PARA CREAR UN NUEVO USUARIO
router.post( '/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria y minimo 6 caracteres').isLength({ min: 6}),
    validarCampos
 ], userController.setUser 
);



// RUTA PARA ACTUALIZAR UN USUARIO
router.put( '/:id', [
    validJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),

    validarCampos
 ],  
userController.updateUser );

// RUTA PARA OBTENER ELIMINAR UN USUARIO
router.delete( '/:id', validJWT ,userController.deleteUser );


module.exports = router;

