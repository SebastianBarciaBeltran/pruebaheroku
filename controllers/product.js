// ADD TYPE
const { response } = require('express');

// MODELS
const Product = require('../models/Product');

// CREAMOS UN NUEVO PRODUCTO
const setProduct = async(req, res = response) => {
       
    // CREAMOS El PRODUCTO CON EL MODELO
    const uid = req.uid;
    const product = new Product({
        user: uid,
        ...req.body
    });
   
    try {
        // CREAMOS El PRODUCTO EN LA DB 
        const productDB = await product.save();

        // GENERAMOS RESPUESTA EXITOSA
        return res.status(201).json({
            ok: true,
            Product: productDB
        });
                
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador(subidaProductoErr)'
        }); 
    }

}

// OBTENEMOS TODOS LOS PRODUCTOS
const getProducts = async(req, res = response) => {

    // OBTENEMOS LOS PRODUCTS
    // SIN PAG
    // const products = await Product.find()
    //                               .populate('user', 'name')
    //                               .populate('brand','name')
    // CON PAG
    const from = Number(req.query.from) || 0;

    const [products, total ] = await Promise.all([
        Product.find()
                .populate('user', 'name')
                .populate('brand'),
                // .skip( from ),
                // .limit( 5 ),

        Product.count()
    ]);

    res.json({  
        ok: true,
        products: products,
        total
    });

}

// ACTUALIZAR UN PRODUCTO 
const updateProduct = async(req, res = response) => {
    
    const productId = req.params.id;
    const uid = req.uid;

    try {

        const product = await Product.findById( productId );

        if ( !product ) {
            res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado por Id'
            });
        }
        
        const productToChange = {
            ...req.body,
            user: uid,
        }

        const productUpdate = await Product.findByIdAndUpdate( productId, productToChange, { new: true } );

        res.json({
            ok: true,
            Product: productUpdate
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador(UpdateProductErr)'
        });
    }

}

// ELIMINAMOS UN PRODUCTO POR SU ID
const deleteProduct = async(req, res = response) => {
    
    const id = req.params.id; // OBTENEMOS EL ID DE LA URL

    try {

        const product = await Product.findById( id ); // COMPROBAMOS QUE EL PRODUCTO EXISTA EN LA BD
        
        if ( !product ) { //SI NO EXISTE RETORNAMOS 404

            return res.status(404).json({
                ok: false,
                msg: 'No existe el producto por ese id en la BD'
            });
        }

        // SI EXISTE LO BORRAMOS
        await Product.findByIdAndRemove( id );

        return res.json({
            ok: true,
            msg: 'Producto eliminado'
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador(eliminarProductoErr)'
        }); 
    }

}


module.exports = {
    setProduct,
    getProducts,
    updateProduct,
    deleteProduct
}