// IMPORTACIONES
const { Schema, model } = require("mongoose");


const CitaSchema = Schema({
   
    title: {
        type: String,
        require: true
    },
    start: {
        type: Date,
        require : true
    },
    color: {
        type: String,
        require : true
    },
    tipo: {
        type: String,
        require : true
    },
    phone: {
        type: String,
        require : true
    },

 });

 CitaSchema.method('toJSON', function (){    
    const { __v, ...object} = this.toObject();
    return object;
 });

 module.exports = model('Cita', CitaSchema);