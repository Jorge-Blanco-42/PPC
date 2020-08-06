'use strict'

var mongoose = require('mongoose');
var app = require("./app");
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio',  {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() =>{
            console.log("Conexion mango ak7");
            //Creacion del servidor
            app.listen(port, () =>{
                console.log("servidor ak7");
            });
        })
        .catch(error => console.log(error));