const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
   
    name:         { type: String, require: true  },

    references:   { type: String, require: true  },

    img:          { type: String,                },

    type:         { type: String, require: true, },

    style:        { type: String, require: true, },   

    form:         { type: String, require: true, },

    colorCristal: { type: String, require: true, },

    colorMontura: { type: String, require: true, },

    gender:       { type: String, require: true, },

    user: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'User',
    },   
    
    brand: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Brand',
    }    
 });

 ProductSchema.method('toJSON', function (){    
    const { __v, ...object} = this.toObject();
    return object;
 });

 module.exports = model('Product', ProductSchema);