// ADD TYPE
const { response } = require('express');

// IMPORTS
const bcrypt = require('bcryptjs');

// MODELS
const User = require('../models/User');

// HERLPERS
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


// CREAMOS EL LOGIN DE LA APP
const login = async(req, res = response) => {

    const { email, password } = req.body;
    
    try {
        
        // VERIFICAMOS EMAIL
        const userDB = await  User.findOne( { email });

        if ( !userDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'El email o contraseña no son correctos'
            }); 
        }

        // VERIFICAMOS SI LA CONTRASEÑA ES LA MISMA QUE LA DE LA BD
        const validPassword = bcrypt.compareSync( password, userDB.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'El email o contraseña no son correctos'
            }); 
        }

        // GENERAMOS EL JWT
        const token = await generateJWT( userDB.id );


        res.json({
            ok: true,
            token
        });
        
    } catch (error) {
        console.log( error );
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador - ErrLogin'
        });
    }
}

// CREAMOS EL LOGIN CON EL GOOGLESIGNIN
const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify( googleToken );

        // VERIFICAMOS SI EXISTE UN USUARIO CON ESE EMAIL
        const userDB = await  User.findOne( { email } );
        let user ;

        if ( !userDB ) {
            // SI NO EXISTE EL USUARIO
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true,
            });
        } else{
            // EXISTE USUARIO
            user = userDB;
            user.google = true;
        }

        // GUARDAMOS EN LA BD
        await user.save();

        // GENERAMOS EL JWT
         const token = await generateJWT( user.id );

        res.json({
            ok: true,
            token
        });
        
        
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }



}

// RENOVACIÓN DEL TOKEN
const renewToken = async(req, res = response) => {

    const uid  = req.uid;

    // GENERANDO EL JWT
    const token = await generateJWT( uid );

    // OBTENEMOS EL USUARIO POR EL UID
    const user = await User.findById( uid );


    return res.json({
        ok: true,
        token,
        user
    });
}



// EXPORTAMOS 
module.exports = {
    login,
    renewToken,
    googleSignIn
}