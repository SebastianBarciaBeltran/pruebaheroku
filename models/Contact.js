// IMPORTACIONES
const { Schema, model } = require("mongoose");

 const ContactSchema = Schema({
   
    name: {
        type: String,
        require: true
    },
    telephone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    text: {
        type: String,
        require: true
    },
    hidden: {
        type: Boolean,
        default: false
    },
    dateOfContact: {
        type: Date,
        default: new Date(),
    },
 });

 module.exports = model('Contact', ContactSchema);