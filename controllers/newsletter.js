// ADD TYPE
const { response } = require('express');
// MODELS
const Newsletter = require('../models/Newsletter');
const User = require('../models/User');



const setUserToNewsLetter = async (req, res = response) => {

    // CAPTURAMOS EL EMAIL DEL cliente
    const { email } = req.body;
    const newUserToNewsLetter = new Newsletter( req.body );
    try {
        // COMPROBAMOS SI EL USUARIO ESTA REGISTRADO YA EN NUESTRO SISTEMA
        const userDB = await User.findOne({email});

        if (userDB) {

            if (userDB.newsLetter) {
                return res.status(400).json({
                    ok: true,
                    msg: 'Este email ya esta dado de alta en nuestra NewsLetter1'
                });
            }
            await User.findByIdAndUpdate( userDB._id, {newsLetter : true}, { new: true} );

             // GENERAMOS RESPUESTA EXITOSA
             return res.status(200).json({
                    ok: true,
                    msg: 'se ha modificado las NewsLetter de tu cuenta correctamente!'
            });
        } 

        // COMPROBAMOS SI EL USUARIO EXISTE EN NUESTRA TABALA DE NEWSLETTER
        const userDbNewsletter = await Newsletter.findOne({email});

        if (userDbNewsletter) {
            return res.status(400).json({
                ok: false,
                msg: 'Este email ya esta dado de alta en nuestra NewsLetter2'
            });
        }

       
        const newUserToNewsLetterDB = await newUserToNewsLetter.save();

        return res.status(200).json({
            ok: true,
            msg: 'Gracias por unirse a nuestras NewsLetter!',
            newUser: newUserToNewsLetterDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...setNewsletter new user'
        })
    }

}

const getUsersNewsletter = async (req, res = response) =>{

    const [users, total ] = await Promise.all([
        User.find({newsLetter : true}),
        User.find({newsLetter : true}).count() 
    ]);

    res.json({
        ok:true,
        users,
        total
    });

}

const getClientsNewsLetter = async (req, res = response) =>{

    const [clients, total ] = await Promise.all([
        Newsletter.find(),
        Newsletter.count() 
    ]);

    res.json({
        ok:true,
        clients,
        total
    });

}

// EXPORTAMOS 
module.exports = {
    setUserToNewsLetter,
    getUsersNewsletter,
    getClientsNewsLetter
}