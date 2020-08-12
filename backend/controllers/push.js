'use strict'
var Push = require("../models/push");
var fs = require("fs");
var path = require("path");
var webpush = require('web-push');
const { json } = require("body-parser");

const vapidKeys = {
    "publicKey": "BNZT2ha3_BN2bo4IoTd2qmtHaQem-3CiyvzZNqD3JHeivHyVpCw7QbYkeBka7WTcIQdIlfqkFV43YnYNt-U1qlU",
    "privateKey": "TdNmZVpJEYXQZaN3ZYgml_ipjtueseDU5UVW-QT5eLQ"
};

webpush.setVapidDetails(
    'mailto:jorgeluis@hotmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);
var controller = {
    sendNewsletter: function (req, res) {
        console.log("notificando");
        var allSubscriptions = [];
        var subStrings =[];
        Push.find({/*Filtros: {year: 2019}*/ }).exec((err, pushs) => {

            if (err) {
                allSubscriptions = [];
            }
            else if (!pushs) {
                allSubscriptions = [];
            }
            else {
                console.log("si");
                allSubscriptions = pushs;
                const notificationPayload = {
                    "notification": {
                        "title": "Notificación we",
                        "body": "Tu orden ha cambiado de estado",
                        "icon": "assets/main-page-logo-small-hat.png",
                        "vibrate": [100, 50, 100],
                        "data": {
                            "dateOfArrival": Date.now(),
                            "primaryKey": 1
                        },
                        "actions": [{
                            "action": "explore",
                            "title": "Go to the site"
                        }]
                    }
                };
                console.log("parseando");
                for (const data of allSubscriptions) {
                    subStrings.push(JSON.parse(data.subscriber));
                }
                console.log(subStrings);
                Promise.all(subStrings.map(sub => webpush.sendNotification(
                    sub, JSON.stringify(notificationPayload))))
                    .then(() => res.status(200).json({ message: 'Newsletter sent successfully.' }))
                    .catch(err => {
                        console.error("Error sending notification, reason: ");
                        //res.sendStatus(500);
                    });
            }
        });
        console.log(allSubscriptions);

        console.log('Total subscriptions', allSubscriptions.length);

        
    },

    home: function (req, res) {
        return res.status(200).send({
            message: "Soy la home"
        });
    },

    savePush: function (req, res) {
        var push = new Push();
        var params = req.body;
        push.subscriber = params.subscriber;

        push.save((err, pushStored) => {
            if (err) return res.status(500).send({ message: "error al guardar el documento" });

            if (!pushStored) return res.status(404).send({ message: "No se ha podido guardar el suscriptor" });

            return res.status(200).send({ push: pushStored });
        });
    },

    getPush: function (req, res) {
        var pushID = req.params.id;
        Push.findById(pushID, (err, push) => {
            if (err) return res.status(500).send({
                message: "Error a devolver los datos"
            });

            if (!push) return res.status(404).send({
                message: "El suscriptor no existe"
            });

            return res.status(200).send({
                push
            })
        });
    },

    getPushs: function (req, res) {

        Push.find({/*Filtros: {year: 2019}*/ }).exec((err, pushs) => {
            if (err) return res.status(500).send({
                message: "Error a devolver los datos"
            });

            if (!pushs) return res.status(404).send({
                message: "El suscriptor no existe"
            });

            return res.status(200).send({
                pushs
            })
        });
    },


};

module.exports = controller;