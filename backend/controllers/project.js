'use strict'
var Project = require("../models/project");
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
            message: "Soy el metodo o accion test del controlador de project8"
        });
    },

    saveProject: function(req, res){
        var project = new Project();
        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = params.null;
        
        project.save((err, projectStored) => {
            if(err) return res.status(500).send({message: "error al guardar el documento" });
            
            if(!projectStored)return res.status(404).send({message: "No se ha podido guardar el proyecto"});
            
            return res.status(200).send({project: projectStored});
        });
    },

    getProject: function(req, res){
        var projectID = req.params.id;
        Project.findById(projectID, (err, project) =>{
            if(err) return res.status(500).send({
                message: "Error a devolver los datos"
            });

            if(!project) return res.status(404).send({
                message: "El proyecto no existe"
            });

            return res.status(200).send({
                project
            })
        });
    },

    getProjects: function(req, res){
        
        Project.find({/*Filtros: {year: 2019}*/}).exec((err, projects) =>{
            if(err) return res.status(500).send({
                message: "Error a devolver los datos"
            });

            if(!projects) return res.status(404).send({
                message: "El proyecto no existe"
            });

            return res.status(200).send({
                projects
            })
        });
    },

    updateProject: function(req, res){
        var projectID = req.params.id;
        var update = req.body;
        Project.findByIdAndUpdate(projectID, update, {new:true}, (err, projectUpdated) =>{
            if(err) return res.status(500).send({
                message: "Error al actualizar"
            });

            if(!projectUpdated) return res.status(404).send({
                message: "El proyecto no existe"
            });

            return res.status(200).send({
                projectUpdated: projectUpdated
            });
        });
    },

    deleteProject: function(req, res){
        var projectID = req.params.id;
        Project.findByIdAndRemove(projectID, (err, projectDeleted) =>{
            if(err) return res.status(500).send({
                message: "Error al borrar"
            });

            if(!projectDeleted) return res.status(404).send({
                message: "El proyecto no existe"
            });
            var filePath = 'uploads/'+projectDeleted.image;
            fs.unlink(filePath, (err) =>{});
            return res.status(200).send({               
                project: projectDeleted
            });
        });
    },

    uploadImage: function(req, res){
        var projectID = req.params.id;
        var fileName = 'Sin imagen';
        console.log(req.files);
        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            fileName = fileSplit[1];
            var extSplit = fileName.split("\.");
            var fileExt = extSplit[extSplit.length-1];
            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                Project.findByIdAndUpdate(projectID, {image: fileName}, {new:true}, (err, projectUpdated) =>{
                    if(err) return res.status(500).send({
                        message: "La imagen no se ha subido"
                    });
        
                    if(!projectUpdated) return res.status(404).send({
                        message: "El proyecto no existe"
                    });
                    console.log(projectUpdated);
                    return res.status(200).send({
                        
                        
                        projectUpdated: projectUpdated
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