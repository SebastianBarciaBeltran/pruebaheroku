// ADD TYPE
const { response } = require('express');
// MODELS
const Cita = require('../models/Cita');


// CREAMOS UNA NUEVA MARCA
const setCita = async(req, res = response) => {

    //CREAMOS EL PRODUCTO CON EL MODELO
    const nuevaCita = new Cita( req.body )


    try {
        // CREAMOS El PRODUCTO EN LA DB 
        const citaDB = await nuevaCita.save();

        // GENERAMOS RESPUESTA EXITOSA
        return res.status(201).json({
            ok: true,
            cita: citaDB
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador(subidaCitaErr)'
        }); 
    }


}

// OBTENEMOS TODAS LAS CITAS
const getCitas = async(req, res = response) => {

    // OBTENEMOS LAS MARCAS
    // SIN PAG
    const citas = await Cita.find()
    //                          
    // CON PAG
    // const from = Number(req.query.from) || 0;

    // const [ brands, total ] = await Promise.all([
    //     Brand.find().populate('user', 'name'),
    //             // .skip( from ),
    //             // .limit( 5 ),
    // ]);

    res.json({
        ok: true,
        citas
    });


}



// ELIMINAMOS LA MARCA
const deleteCita = async(req, res = response) => {

    const citaId = req.params.id;

    try {
        
        const cita = await Cita.findById( citaId );

        if ( !cita ) { //SI NO EXISTE RETORNAMOS 404

            return res.status(404).json({
                ok: false,
                msg: 'No existe la cita por ese id en la BD'
            });
        }
       

        // SI EXISTE LO BORRAMOS
        await Cita.findByIdAndRemove( citaId );

        return res.json({
            ok: true,
            msg: 'cita eliminada'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador(eliminarCitaErr)'
        }); 
    }

}





// EXPORTAMOS 
module.exports = {
    setCita,
    getCitas,
    deleteCita
}