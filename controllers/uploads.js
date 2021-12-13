// ADD TYPE
const { response } = require("express");
// IMPORTS
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
// HELPERS
const { updateImage } = require("../helpers/update-image");

// FUNCION PARA CREAR/ACTUALIZAR UNA IMAGEN
const fileUpdload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id   = req.params.id;

    // VALIDAMOS LOS TIPOS
    const tiposValidos = ['users', 'products', 'brands'];

    if ( !tiposValidos.includes(tipo) ) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo seleccionado no es correcto(tipo)'
        });
    }

    // validamos si existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    // PROCESAMOS LA IMAGEN
    const file = req.files.img;

    // OBTENEMOS LA EXTENSIÓN DEL ARCHIVO
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    // VALIDAMOS LA EXTENSIÓN
    const extensionesValidas = ['png', 'jpg', 'jpeg'];
    
    if ( !extensionesValidas.includes(extensionArchivo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'La extension de la imagen no es permitida'
        });
    }

    // GENERAMOS EL NOMBRE DE LA IMAGEN
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`

    // PATH DE LA IMG PARA GUARDAR LA IMG EN SU CARPETA CORRESPONDIENTE
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // MOVEMOS LA IMAGEN
    file.mv(path , (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
 
        // ACTUALIZAMOS LA BASE DE TATOS
        updateImage( tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });

    });
  
}

// FUNCION PARA OBETENER LA IMAGEN
const getImage = (req, res = response) => {

    const tipo = req.params.tipo;
    const img = req.params.img;

    const pathImg =  path.join( __dirname, `../uploads/${ tipo }/${ img }` );
    
    // SI EXISTE LA IMAGEN LA ENVIO 
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else{ // SI NO EXISTE ENVIAMOs NOIMAGE POR DEFECTO
        const pathImg =  path.join( __dirname, '../uploads/noImage.png' );
        res.sendFile( pathImg );        
    }

}

module.exports = {
    fileUpdload,
    getImage
}