'use strict'
var Push = require("../models/push");
var fs = require("fs");
var path = require("path");

var controller = {
    home: function(req, res){
        return res.status(200).send({
           message: "Soy la home" 
        });
    },
    
    savePush: function(req, res){
        var push = new Push();
        var params = req.body;
        push.subscriber = params.subscriber;
        
        push.save((err, pushStored) => {
            if(err) return res.status(500).send({message: "error al guardar el documento" });
            
            if(!pushStored)return res.status(404).send({message: "No se ha podido guardar el suscriptor"});
            
            return res.status(200).send({push: pushStored});
        });
    },

    getPush: function(req, res){
        var pushID = req.params.id;
        Push.findById(pushID, (err, push) =>{
            if(err) return res.status(500).send({
                message: "Error a devolver los datos"
            });

            if(!push) return res.status(404).send({
                message: "El suscriptor no existe"
            });

            return res.status(200).send({
                push
            })
        });
    },

    getPushs: function(req, res){
        
        Push.find({/*Filtros: {year: 2019}*/}).exec((err, pushs) =>{
            if(err) return res.status(500).send({
                message: "Error a devolver los datos"
            });

            if(!pushs) return res.status(404).send({
                message: "El suscriptor no existe"
            });

            return res.status(200).send({
                pushs
            })
        });
    },


};

module.exports = controller;