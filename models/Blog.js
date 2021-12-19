// IMPORTACIONES
const { Schema, model } = require("mongoose");


const BlogSchema = Schema({
   
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    subtitle: {
        type: String,
    },
    parraf1: {
        type: String,
    },
    parraf2: {
        type: String,
    },
    parraf3: {
        type: String,
    },
    dateOfPublish: {
        type: Date,
        require: true,
        default: new Date(),
    },
    user: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    img: {
        type: String,
    },
 });

 BlogSchema.method('toJSON', function (){    
    const { __v, ...object} = this.toObject();
    return object;
 });

 module.exports = model('Blog', BlogSchema);