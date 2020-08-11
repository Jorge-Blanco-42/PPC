'use strict'

var User = require('../models/user');

var controller = {
    home : function (req, res){
        return res.status(200).send({
            message : "Home User"
        });
    }, 
    test : function(req, res){
        return res.status(200).send({
            message : "Soy el método controlador User "
        });

    },

    addUser : function(req, res){
        
        var user = new User();

        var params = req.body;

        user.name = params.name;
        user.password = params.password;
        user.email = params.email;
        user.phoneNumber = params.phoneNumber;
        user.address = params.address;
        user.role = params.role;
        user.orders = params.orders;

        user.save((err, userStored) => {

            if(err) return res.status(500).send({message: "ERROR AL GUARDAR EL DOCUMENTO"});

            if(!userStored) return res.status(404).send({message: "No se ha podido guardar el Usuario"});

            return res.status(200).send({user : userStored});
        });  
       
    },

    getUserByID(req, res){
        var userID = req.params.id;

        if(userID === null) res.status(404).send({message : "El usuario no existe"});

        User.findById(userID, (err, user) => {

            if(err) return res.status(500).send({message : "Error al obtener de la base"});
            if (!user) return res.status(404).send({message : "El Usuario no existe"});
            
            return res.status(200).send(
                user
            );
        });


    },
    
    getUser(req, res){
        var email = req.params.email;
        var password = req.params.password;

        User.findOne({"email": email, 
        "password" : password}, function (err, user){
            if(err) return res.status(500).send({
                message : "Error al devolver los datos"
            });

            if(!user) return res.status(404).send({
                message : "El usuario no existe"
            });

            return res.status(200).send({user : user});
        })
    },

    getUsers(req, res){
        User.find({/*Filtros: {year: 2019}*/}).exec((err, users) =>{
            if(err) return res.status(500).send({
                message: "Error a devolver los datos"
            });

            if(!users) return res.status(404).send({
                message: "El usuario no existe"
            });

            return res.status(200).send({
                users : users
            })
        });
    }, 

    updateUser : function(req, res){
        var userID = req.params.id;
        var update = req.body;
        User.findByIdAndUpdate(userID, update, {new:true}, (err, userUpdated) =>{
            if(err) return res.status(500).send({
                message: "Error al actualizar"
            });

            if(!userID) return res.status(404).send({
                message: "El usuario no existe"
            });

            return res.status(200).send({
                userUpdated: userUpdated
            });
        });

        
    },

    deleteUser : function(req, res){
        var userID = req.params.id;

        User.findByIdAndDelete(userID, (err, userRemoved) =>{
            if(err) return res.status(500).send({
                message : "No se pudo remover el usuario"
            });

            if(!userRemoved) return res.status(404).send({
                message : "USUARIO NO ENCONTRADO EN BASE: No se puede eliminar el usuario"
            });

            return res.status(200).send({
                user : userRemoved
            });
        })
    }
};

module.exports = controller;