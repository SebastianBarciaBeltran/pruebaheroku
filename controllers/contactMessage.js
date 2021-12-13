// ADD TYPE
const { response } = require('express');
// NODEMAILER
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
// MODELS
const Contact = require('../models/Contact');

const OAuth2_client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

OAuth2_client.setCredentials( { refresh_token : process.env.REFRESH_TOKEN });

// FUNCION PARA ENVIAR UN MAIL A LA PERSONA QUE CONTACTA 
const sendContactEmail = async (req, res = response) => {

    const {name, email, telephone, text, hidden, dateOfContact } = req.body;
    
    const accessToken = OAuth2_client.getAccessToken();
    
    const dbContact = new Contact( req.body );
    
    try {

        await dbContact.save();

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: false,
            auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken
            },
        });
    
        const mailOption = {
            from: 'Opivista',
            to: `${email}`,
            subject: 'optivista',
            html:    
            ` <h1>Optivista</h1>
              <h2>¡Hola ${name} !</h2>
              <p>Gracias por contactar con nosotros, te llamaremos al telefono: ${telephone} lo mas pronto posible.</p>
            `
            ,
        };
   
        transporter.sendMail(mailOption, function (err, res) {
            if (err) {
                console.log('error aaqui');
                console.log(err);

            } else{
                console.log(res);
            }
        });
    
        transporter.close();

        return res.status(200).json({
            ok: true,
            msg: 'email enviado correctamente'
        });
        
    } catch (error) {
        // console.log( error );
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

// EXPORTAMOS 
module.exports = {
  sendContactEmail
}