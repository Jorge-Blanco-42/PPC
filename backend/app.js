var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// archivos de rutas
var projectRoutes = require("./routes/project");
var restaurantRoutes = require("./routes/restaurant");
var paymentMethodRoutes = require("./routes/paymentMethod");
var orderRoutes = require("./routes/order");
var productRoutes = require("./routes/product");
var userRoutes = require("./routes/user");

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
app.use("/api", orderRoutes); // poner /api antes de todas las url de Order
app.use("/api", productRoutes); // poner /api antes de todas las url de Product
app.use("/api", userRoutes); // poner /api antes de todas las url de User
//exportar
module.exports = app;