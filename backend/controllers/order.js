'use strict'

var Order = require('../models/order');

var controller = {
    home : function (req, res){
        return res.status(200).send({
            message : "Home Order"
        });
    }, 
    test : function(req, res){
        return res.status(200).send({
            message : "Soy el método controlador Order "
        });

    },

    addOrder : function(req, res){
        
        var order = new Order();

        var params = req.body;

        order.number = params.number;
        order.total = params.total;
        order.date = params.date;

        order.save((err, orderStored) => {

            if(err) return res.status(500).send({message: "ERROR AL GUARDAR EL DOCUMENTO"});

            if(!orderStored) return res.status(404).send({message: "No se ha podido guardar la orden"});

            return res.status(200).send({order : orderStored});
        });  
       
    },

    getOrder(req, res){
        var orderID = req.params.id;

        if(orderID == null) res.status(404).send({message : "La orden existe "});

        Order.findById(orderID, (err, order) => {

            if(err) return res.status(500).send({message : "Error al obtener de la base"});
            if (!order) return res.status(404).send({message : "La orden no existe "});
            
            return res.status(200).send({
                order
            })
        });


    },

    getOrders(req, res){
        Order.find({/*Filtros: {year: 2019}*/}).exec((err, order) =>{
            if(err) return res.status(500).send({
                message: "Error a devolver los datos"
            });

            if(!order) return res.status(404).send({
                message: "La orden no existe"
            });

            return res.status(200).send({
                order : order
            })
        });
    }, 

    updateOrder: function(req, res){
        var orderID = req.params.id;
        var update = req.body;
        Order.findByIdAndUpdate(orderID, update, {new:true}, (err, orderUpdated) =>{
            if(err) return res.status(500).send({
                message: "Error al actualizar"
            });

            if(!orderUpdated) return res.status(404).send({
                message: "La orden no existe"
            });

            return res.status(200).send({
                orderUpdated: orderUpdated
            });
        });

        
    },

    deleteOrder : function(req, res){
        var orderID = req.params.id;

        Order.findByIdAndDelete(orderID, (err, orderRemoved) =>{
            if(err) return res.status(500).send({
                message : "No se pudo remover la orden"
            });

            if(!orderRemoved) return res.status(404).send({
                message : "No se puede eliminar la orden"
            });

            return res.status(200).send({
                order : orderRemoved
            });
        })
    }
};

module.exports = controller;