// ADD TYPE
const { response } = require('express');
// NODEMAILER
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
// MODELS
const Contact = require('../models/Contact');

const OAuth2_client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

OAuth2_client.setCredentials( { refresh_token : process.env.REFRESH_TOKEN });


 sendContactEmail = async (req, res = response) => {
    
    const {name, email, telephone, text, hidden, dateOfContact } = req.body;

    const accessToken =  OAuth2_client.getAccessToken();
    
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

const getCotacts = async (req, res = response ) => {

    
    const contacts = await Contact.find();

    res.json({
        ok: true,
        contacts
    });


}

const deleteContact = async(req, res = response) => {

    const contactId = req.params.id;

    try {
        
        const contact = await Contact.findById( contactId );

        if ( !contact ) { //SI NO EXISTE RETORNAMOS 404

            return res.status(404).json({
                ok: false,
                msg: 'No existe contact por ese id en la BD'
            });
        }
       

        // SI EXISTE LO BORRAMOS
        await Contact.findByIdAndRemove( contactId );

        return res.json({
            ok: true,
            msg: 'contacto eliminado'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador(eliminarContactErr)'
        }); 
    }

}


// EXPORTAMOS 
module.exports = {
  sendContactEmail,
  getCotacts,
  deleteContact
}