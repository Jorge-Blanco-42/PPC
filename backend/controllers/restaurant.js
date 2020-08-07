'use strict'
var Restaurant = require("../models/restaurant");
var fs = require("fs");
var path = require("path");

var controller = {
    home: function(req, res){
        return res.status(200).send({
           message: "Soy la home" 
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: "Soy el metodo o accion test del controlador de restaurant"
        });
    },

    getRestaurant: function(req, res){
        var restaurantID = req.params.id;
        console.log(restaurantID);
        Restaurant.findById(restaurantID, (err, restaurant) =>{
            if(err) return res.status(500).send({
                message: "Error a devolver los datos"
            });

            if(!restaurant) return res.status(404).send({
                message: "No hay restaurante"
            });

            return res.status(200).send({
                restaurant
            })
        });
    },

    getRestaurants: function(req, res){
        
        Restaurant.find({/*Filtros: {year: 2019}*/}).exec((err, restaurants) =>{
            if(err) return res.status(500).send({
                message: "Error a devolver los datos"
            });

            if(!restaurants) return res.status(404).send({
                message: "El proyecto no existe"
            });

            return res.status(200).send({
                restaurants
            })
        });
    },

    updateRestaurant: function(req, res){
        var restaurantID = req.params.id;
        var update = req.body;
        Restaurant.findByIdAndUpdate(restaurantID, update, {new:true}, (err, restaurantUpdated) =>{
            if(err) return res.status(500).send({
                message: "Error al actualizar"
            });

            if(!restaurantUpdated) return res.status(404).send({
                message: "El proyecto no existe"
            });

            return res.status(200).send({
                restaurantUpdated: restaurantUpdated
            });
        });
    },
    
    uploadImage: function(req, res){
        var restaurantID = req.params.id;
        var fileName = 'Sin imagen';
        console.log(req.files);
        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            fileName = fileSplit[1];
            var extSplit = fileName.split("\.");
            var fileExt = extSplit[extSplit.length-1];
            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                Restaurant.findByIdAndUpdate(restaurantID, {image: fileName}, {new:true}, (err, restaurantUpdated) =>{
                    if(err) return res.status(500).send({
                        message: "La imagen no se ha subido"
                    });
        
                    if(!restaurantUpdated) return res.status(404).send({
                        message: "El proyecto no existe"
                    });
                    console.log(restaurantUpdated);
                    return res.status(200).send({                      
                        restaurantUpdated: restaurantUpdated
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