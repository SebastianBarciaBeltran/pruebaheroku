// IMPORTACIONES
const { Schema, model } = require("mongoose");

const BrandSchema = Schema({
   
    name:        { type: String, require: true },

    description: { type: String, require: true },

    user: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'User',
    },  

    img:         { type: String,               },
 });

 BrandSchema.method('toJSON', function (){    
    const { __v, ...object} = this.toObject();
    return object;
 });

 module.exports = model('Brand', BrandSchema);