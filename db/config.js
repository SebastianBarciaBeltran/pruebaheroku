const Mongoose  = require("mongoose");

const dbConnection = async () => {

    try{
        
        await Mongoose.connect( process.env.MongoDB );

        console.log('DB Online');
    } catch (error){
        console.log(error);
        throw new Error('Error a la hora de incializar la BD');
    }

}

module.exports = {
    dbConnection
}