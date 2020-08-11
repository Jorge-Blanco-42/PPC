'use strict'

var Product = require('../models/product');

var controller = {
    home : function (req, res){
        return res.status(200).send({
            message : "Home Product"
        });
    }, 
    test : function(req, res){
        return res.status(200).send({
            message : "Soy el método controlador Product "
        });

    },

    addProduct : function(req, res){
        
        var product = new Product();

        var params = req.body;

        product.name = params.name;
        product.description = params.description;
        product.price = params.price;
        product.image = params.image;

        product.save((err, productStored) => {

            if(err) return res.status(500).send({message: "ERROR AL GUARDAR EL DOCUMENTO"});

            if(!productStored) return res.status(404).send({message: "No se ha podido guardar el producto"});

            return res.status(200).send({product : productStored});
        });  
       
    },

    getProduct(req, res){
        var productID = req.params.id;

        if(productID == null) res.status(404).send({message : "El producto no existe"});

        Product.findById(productID, (err, product) => {

            if(err) return res.status(500).send({message : "Error al obtener de la base"});
            if (!product) return res.status(404).send({message : "El producto no existe"});
            
            return res.status(200).send({
                product
            })
        });


    },

    getProducts(req, res){
        Product.find({/*Filtros: {year: 2019}*/}).exec((err, product) =>{
            if(err) return res.status(500).send({
                message: "Error a devolver los datos"
            });

            if(!product) return res.status(404).send({
                message: "El producto no existe"
            });

            return res.status(200).send({
                product : product
            })
        });
    }, 

    updateProduct: function(req, res){
        var productID = req.params.id;
        var update = req.body;
        Product.findByIdAndUpdate(productID, update, {new:true}, (err, productUpdated) =>{
            if(err) return res.status(500).send({
                message: "Error al actualizar"
            });

            if(!productID) return res.status(404).send({
                message: "El producto no existe"
            });

            return res.status(200).send({
                productUpdated: productUpdated
            });
        });

        
    },


    uploadImage: function(req, res){
        var productID = req.params.id;
        var fileName = 'Sin imagen';
        console.log(req.files);
        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            fileName = fileSplit[1];
            var extSplit = fileName.split("\.");
            var fileExt = extSplit[extSplit.length-1];
            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                Product.findByIdAndUpdate(productID, {image: fileName}, {new:true}, (err, productUpdated) =>{
                    if(err) return res.status(500).send({
                        message: "La imagen no se ha subido"
                    });
        
                    if(!productUpdated) return res.status(404).send({
                        message: "El proyecto no existe"
                    });
                    console.log(productUpdated);
                    return res.status(200).send({                      
                        productUpdated: productUpdated
                    });
                });
            }else{
                fs.unlink(filePath, (err) =>{
                    return res.status(200).send({
                        message: "La extension no es valida"
                    })
                });
                
            }
        }else{
            return res.status(200).send({
                message: fileName
            });
        }
    },

    deleteProduct : function(req, res){
        var productID = req.params.id;

        Product.findByIdAndDelete(productID, (err, productRemoved) =>{
            if(err) return res.status(500).send({
                message : "No se pudo remover el producto"
            });

            if(!productRemoved) return res.status(404).send({
                message : "PRODUCTO NO ENCONTRADO EN BASE: No se puede eliminar el producto"
            });

            return res.status(200).send({
                product : productRemoved
            });
        })
    },

    getImageFile: function(req, res){
        var file = req.params.image;
        var path_file = './uploads/'+file;
        fs.exists(path_file, (exists) =>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(404).send({
                    message: "No existe la imagen"
                });
            }
        });
        
    }
};

module.exports = controller;