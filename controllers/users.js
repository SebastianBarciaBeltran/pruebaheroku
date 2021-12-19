// ADD TYPE
const { response } = require('express');
// IMPORTS
const bcrypt = require('bcryptjs');
// MODELS
const User = require('../models/User');
// HELPERS
const { generateJWT } = require('../helpers/jwt');

// Eliminar imagen 
const eliminarImagen = require('../helpers/update-image');


// OPERACION PARA CREAR UN NUEVO USUARIO
const setUser = async(req, res = response) => {

    // EXTRAEMOS LAS VARIABLES DEL BODY
    const { name, email, password } = req.body;

    try {
        const emailExist = await User.findOne({ email });

        if ( emailExist ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

      // CREAR USUARIO CON EL MODELO
      const user = new User( req.body );

      // ENCRYPTAMOS LA PASS
      const salt = bcrypt.genSaltSync(); 
      user.password = bcrypt.hashSync( password, salt );
      
      await user.save();

      // GENERAR EL JWT   
      const token = await generateJWT( user.id );
      
      res.json({
          ok:true,
          user,
          token
       });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...setUser'
        })
    }

}

// OPERACION QUE DEVUELVE TODOS LOS USUARIOS
const getUsers = async(req, res) => {

    // OBTENEMOS LOS USERS SIN PAGINACIÓN
    // const users = await User.find();
    
    // OBTENEMOS LOS USERS CON PAGINACIÓN
    const from = Number(req.query.from) || 0;
    
    const [users, total ] = await Promise.all([
        User.find()
            .skip( from ),
            // .limit( 5 ),

        User.count()
    ]);

    res.json({  
        ok:true,
        users,
        total
    });

}

// OPERACION PARA ACTUALIZAR UN USUARIO
const updateUser = async(req, res = response) => {

    //TODO: Validar token y comprobar si es el usuario correcto
    const uid = req.params.id;

    try {

        const userDB = await User.findById( uid );

        if ( !userDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id!'
            });
        }
        
        // ACTUALIZAMOS AL USER
        const { password, google, email, ...campos } = req.body;

        if ( userDB.email !== email) { 

            const emailExist = await User.findOne({ email });

            if ( emailExist ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        //TODO: VERIFICAR ESTO
        // if ( !userDB.google) {
        //     campos.email = email;
        // } else if ( usuarioDB.email !== email ) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'Usuario de google no puede cambiar su correo'
        //     });
        // }

        // if (userDB.google) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'Usuario de google no puede cambiar su correo'
        //     });
        // } else {
            // }
         
            campos.email = email;
  

        const userUpdate = await User.findByIdAndUpdate( uid, campos, { new: true} );

        res.json({
            ok: true,
            user: userUpdate
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...updateUser'
        });
    }
}

// OPERACION PARA ELIMINAR UN
const deleteUser = async(req, res = response) => {
    
    const uid = req.params.id;

    try {

        const userDB = await User.findById( uid );

        if ( !userDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        
        // EVALUAMOS SI ESE BLOG TIENE UNA IMAGEN PREVIAMENTE ASIGNADA
        pathViejo =  `./uploads/users/${ userDB.img }`;
        eliminarImagen.deletedImage( pathViejo );   
      

        await User.findByIdAndRemove( uid );

        res.json({
            ok: true,
            msg: 'Usuario eliminado correctamente'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...updateUser'
        });
    }



}

module.exports = {
    getUsers,
    setUser,
    updateUser,
    deleteUser
}