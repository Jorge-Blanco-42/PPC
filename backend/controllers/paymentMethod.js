'use strict'

var Payment = require('../models/paymentMethod');

var controller = {
    home : function (req, res){
        return res.status(200).send({
            message : "Home"
        });
    }, 
    test : function(req, res){
        return res.status(200).send({
            message : "Soy el método controlador"
        });

    },

    addPaymentMethod : function(req, res){
        
        var paymentMethod = new Payment();

        var params = req.body;

        paymentMethod.name = params.name;
        paymentMethod.state = params.state;

        paymentMethod.save((err, paymentStored) => {

            if(err) return res.status(500).send({message: "ERROR AL GUARDAR EL DOCUMENTO"});

            if(!paymentStored) return res.status(404).send({message: "No se ha podido guardar el men"});

            return res.status(200).send({paymentMethod : paymentStored});
        });  
       

        return res.status(200).send({
            paymentMethod : paymentMethod,
            message : "Método paymentMethod"
        });
    },

    getPaymentMethod(req, res){
        var paymentID = req.params.id;

        if(paymentID == null) res.status(404).send({message : "El proyecto no existe "});

        Payment.findById(paymentID, (err, payment) => {

            if(err) return res.status(500).send({message : "Error al obtener de la base"});
            if (!payment) return res.status(404).send({message : "El proyecto no existe "});
            
            return res.status(200).send({
                payment
            })
        });


    },

    getPaymentMethods(req, res){
        Payment.find({/*Filtros: {year: 2019}*/}).exec((err, payments) =>{
            if(err) return res.status(500).send({
                message: "Error a devolver los datos"
            });

            if(!payments) return res.status(404).send({
                message: "El proyecto no existe"
            });

            return res.status(200).send({
                payments : payments
            })
        });
    }, 

    updatePaymentMethod: function(req, res){
        var paymentID = req.params.id;
        var update = req.body;
        Payment.findByIdAndUpdate(paymentID, update, {new:true}, (err, paymentUpdated) =>{
            if(err) return res.status(500).send({
                message: "Error al actualizar"
            });

            if(!paymentUpdated) return res.status(404).send({
                message: "El proyecto no existe"
            });

            return res.status(200).send({
                paymentUpdated: paymentUpdated
            });
        });

        
    },

    deletePaymentMethod : function(req, res){
        var paymentID = req.params.id;

        Payment.findByIdAndDelete(paymentID, (err, paymentRemoved) =>{
            if(err) return res.status(500).send({
                message : "No se pudo remover el método de pago"
            });

            if(!paymentRemoved) return res.status(404).send({
                messaeg : "No se puede eliminar ese método de pago"
            });

            return res.status(200).send({
                payment : paymentRemoved
            });
        })
    }
};

module.exports = controller;