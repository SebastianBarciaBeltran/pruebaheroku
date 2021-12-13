const { response } = require('express');
const jwt = require('jsonwebtoken');

const validJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay Token en la peteción'
        });
    }

    try {
      const { uid, name } =  jwt.verify( token, process.env.SECRET_JWT_SEED );
      req.uid = uid;  

      next();
    
    } catch (error) {
        console.log( error );
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

 
}

module.exports = {
    validJWT
}