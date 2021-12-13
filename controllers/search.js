// ADD TYPE
const { response } = require('express');

// MODELS
const User    = require('../models/User');
const Product = require('../models/Product');
const Brand   = require('../models/Brand');

// OPERACION PARA BUSQUEDAGENERICA
const getAll = async(req, res = response) => {

    const term = req.params.term;
    const regex = new RegExp(term, 'i' );

    const [users, products, brands] = await Promise.all([
        User.find({ name: regex }),
        Product.find({ name: regex }),
        Brand.find({ name: regex })
    ])

    res.json({  
        ok: true,
        termino: term,
        msg: 'buscando de todo',
        users,
        products,
        brands
    });

}

// OPERACION DE BUSQUEDA SEGMENTADA
const getColletionDocument = async(req, res = response) => {

    const table = req.params.table;
    const term = req.params.term;
    const regex = new RegExp(term, 'i' );

    let data = [];

    switch ( table ) {
        case 'users':
             data = await User.find({ name: regex });
            break;

        case 'products':
             data = await Product.find({ name: regex })
                                 .populate('user', 'name')
                                 .populate('brand', 'name');
            break;
             
        case 'brands':
              data = await Brand.find({ name: regex })
                                .populate('user', 'name');
            break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser users|products|brands'
            })
            break;
    }

    res.json({
        ok: true,
        result: data
    });


}

module.exports = {
    getAll,
    getColletionDocument
}