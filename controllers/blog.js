// ADD TYPE
const { response } = require('express');
// MODELS
const Blog = require('../models/Blog');

// Eliminar imagen 
const eliminarImagen = require('../helpers/update-image');

// CREAMOS UNA NUEVA ENTRADA DE BLOG
const setBlog = async(req, res = response) => {

    //CREAMOS EL PRODUCTO CON EL MODELO
    const uid = req.uid;
    const blog = new Blog({
        user: uid,
        ...req.body
    });

    try {
        // CREAMOS El PRODUCTO EN LA DB 
        const blogDB = await blog.save();

        // GENERAMOS RESPUESTA EXITOSA
        return res.status(201).json({
            ok: true,
            Blog: blogDB
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador(subidaBlogErr)'
        }); 
    }


}

// OBTENEMOS TODAS LAS ENTRADAS DEL BLOG
const getBlogs = async(req, res = response) => {

    // OBTENEMOS LAS MARCAS
    // SIN PAG
    // const blogs = await blog.find()
    //                           .populate('user', 'name')
    // CON PAG
    const from = Number(req.query.from) || 0;

    const [ blogs, total ] = await Promise.all([
        Blog.find().populate('user', 'name'),
              

        Blog.count()
    ]);

    res.json({
        ok: true,
        blogs,
        total
    });


}

// ACTUALIZAMOS UNA MARCA 
const updateblog = async(req, res = response) => {

    const blogId = req.params.id;
    const uid = req.uid;

    try {
    
        const blog = await Blog.findById( blogId );

        if ( !blog ) {
            res.status(404).json({
                ok: false,
                msg: 'Blog no encontrada por Id'
            });
        }

        const blogToChange = {
            ...req.body,
            user: uid,
        }

        const branUpdate = await Blog.findByIdAndUpdate( blogId, blogToChange, { new: true} );

        res.json({
            ok: true,
            blog: branUpdate
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador(UpdateblogErr)'
        });
    }

}

// ELIMINAMOS LA ENTRADA DE UN BLOG
const deleteblog = async(req, res = response) => {

    const blogId = req.params.id;

    try {
        
        const blog = await Blog.findById( blogId );

        if ( !blog ) { //SI NO EXISTE RETORNAMOS 404
            return res.status(404).json({
                ok: false,
                msg: 'No existe la marca por ese id en la BD'
            });
        }

        // EVALUAMOS SI ESE BLOG TIENE UNA IMAGEN PREVIAMENTE ASIGNADA
        pathViejo =  `./uploads/blogs/${ blog.img }`;
        eliminarImagen.deletedImage( pathViejo )        


        // SI EXISTE LO BORRAMOS
        await Blog.findByIdAndRemove( blogId );

        return res.json({
            ok: true,
            msg: 'Blog eliminado'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador(eliminarblogErr)'
        }); 
    }

}

// OBTENEMOS UNA MARCA POR ID
const getBlogById = async(req, res = response) => {

    const blogId = req.params.id;

    try {
        
        const blog = await Blog.findById( blogId )
                                 .populate('user', 'name');


        return res.json({
            ok: true,
            blog
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador(blogByIdblogErr)'
        }); 
    }

}




// EXPORTAMOS 
module.exports = {
    setBlog,
    getBlogs,
    getBlogById,
    deleteblog,
    updateblog
}