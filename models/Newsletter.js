// IMPORTACIONES
const { Schema, model } = require("mongoose");

const NewsletterSchema = Schema({
   
    email: { type: String, require: true, unique: true },

 });

 NewsletterSchema.method('toJSON', function (){    
    const { __v, ...object} = this.toObject();
    return object;
 });

 module.exports = model('Newsletter', NewsletterSchema);