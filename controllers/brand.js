// ADD TYPE
const { response } = require('express');
// MODELS
const Brand = require('../models/Brand');


// Eliminar imagen 
const eliminarImagen = require('../helpers/update-image');

// CREAMOS UNA NUEVA MARCA
const setBrand = async(req, res = response) => {

    //CREAMOS EL PRODUCTO CON EL MODELO
    const uid = req.uid;
    const brand = new Brand({
        user: uid,
        ...req.body
    });

    try {
        // CREAMOS El PRODUCTO EN LA DB 
        const brandDB = await brand.save();

        // GENERAMOS RESPUESTA EXITOSA
        return res.status(201).json({
            ok: true,
            Brand: brandDB
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador(subidaBrandErr)'
        }); 
    }


}

// OBTENEMOS TODAS LAS MARCAS
const getBrands = async(req, res = response) => {

    // OBTENEMOS LAS MARCAS
    // SIN PAG
    // const brands = await Brand.find()
    //                           .populate('user', 'name')
    // CON PAG
    const from = Number(req.query.from) || 0;

    const [ brands, total ] = await Promise.all([
        Brand.find().populate('user', 'name'),
                // .skip( from ),
                // .limit( 5 ),

        Brand.count()
    ]);

    res.json({
        ok: true,
        brands,
        total
    });


}

// ACTUALIZAMOS UNA MARCA 
const updateBrand = async(req, res = response) => {

    const brandId = req.params.id;
    const uid = req.uid;

    try {
    
        const brand = await Brand.findById( brandId );

        if ( !brand ) {
            res.status(404).json({
                ok: false,
                msg: 'Marca no encontrada por Id'
            });
        }

        const brandToChange = {
            ...req.body,
            user: uid,
        }

        const branUpdate = await Brand.findByIdAndUpdate( brandId, brandToChange, { new: true} );

        res.json({
            ok: true,
            Brand: branUpdate
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador(UpdateBrandErr)'
        });
    }

}

// ELIMINAMOS LA MARCA
const deleteBrand = async(req, res = response) => {

    const brandId = req.params.id;

    try {
        
        const brand = await Brand.findById( brandId );

        if ( !brand ) { //SI NO EXISTE RETORNAMOS 404

            return res.status(404).json({
                ok: false,
                msg: 'No existe la marca por ese id en la BD'
            });
        }
        // EVALUAMOS SI ESE BLOG TIENE UNA IMAGEN PREVIAMENTE ASIGNADA
        pathViejo =  `./uploads/brands/${ brand.img }`;
        eliminarImagen.deletedImage( pathViejo );   

        // SI EXISTE LO BORRAMOS
        await Brand.findByIdAndRemove( brandId );

        return res.json({
            ok: true,
            msg: 'Marca eliminada'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador(eliminarBrandErr)'
        }); 
    }

}

// OBTENEMOS UNA MARCA POR ID
const getBrandById = async(req, res = response) => {

    const brandId = req.params.id;

    try {
        
        const brand = await Brand.findById( brandId )
                                 .populate('user', 'name');


        return res.json({
            ok: true,
            brand
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador(brandByIdBrandErr)'
        }); 
    }

}




// EXPORTAMOS 
module.exports = {
    setBrand,
    getBrands,
    updateBrand,
    deleteBrand,
    getBrandById
}