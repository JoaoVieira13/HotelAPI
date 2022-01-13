const bodyParser = require('body-parser');
const express = require('express');
const Quartos = require('../Data/Quartos')
const cheackAuth = require("../Data/middleware/authAdminMiddleware")


function QuartosRouter() {
    let router = express();


    router.use(bodyParser.json({ limit: '100mb' }));
    router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    router.use(function (req, res, next) {
        console.log('Time:', Date.now())
        next();
    });

    router.route('/add')
        .get(function (req, res, next) {
            Quartos.findAll(req)
                .then((quartos) => {
                    res.send(quartos);
                    next();
                })
                .catch((err) => {
                    next();
                });
        })
        .post(function (req, res, next) {

            let body = req.body;
            Quartos.create(body)
                .then(() => {
                    console.log('Bedroom saved');
                    res.status(200);
                    res.send(body);
                    next();
                })
                .catch((err) => {
                    console.log(err);
                    err.status = err.status || 500;
                    res.status(401);
                    next();
                });
        });

    router.route('/change/:quartoId')
        .put(function (req, res, next) {
            let quartoId = req.params.quartoId;
            let body = req.body;

            Quartos.update(quartoId, body)
                .then((quarto) => {
                    res.status(200);
                    res.send(quarto);
                    next();
                })
                .catch((err) => {
                    res.status(404);
                    next();
                });
        })


    router.route('/quarto/:quartoId')
        .get(function (req, res, next) {
            let quartoId = req.params.quartoId;

            Quartos.findById(quartoId)
                .then((quarto) => {
                    res.status(200);
                    res.send(quarto);
                    next();
                })
                .catch((err) => {
                    res.status(404);
                    next();
                });
        })
        .put(async function (req, res, next) {
            let quartoId = req.params.quartoId;
            let body = req.body;
            const quarto = await Quartos.findById(quartoId)
            quarto.reserve.push(body)
            Quartos.save(quarto)
            res.send(quarto)
        })

        .delete(function (req, res, next) {
            console.log('Bedroom deleted');
            let quartoId = req.params.quartoId;
            Quartos.removeById(quartoId)
                .then(() => {
                    res.status(200).json();
                    next();
                })
                .catch((err) => {
                    console.log('err');
                    res.status(404);
                    next();
                });
        });

    return router;
}

module.exports = QuartosRouter;