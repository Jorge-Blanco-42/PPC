var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// archivos de rutas
var projectRoutes = require("./routes/project");
var restaurantRoutes = require("./routes/restaurant");
var paymentMethodRoutes = require("./routes/paymentMethod");

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas 
app.use("/api", projectRoutes); // poner /api antes de todas las url de Project
app.use("/api", restaurantRoutes); // poner /api antes de todas las url de Restaurant
app.use("/api", paymentMethodRoutes); // poner /api antes de todas las url de PaymentMethod
//exportar
module.exports = app;