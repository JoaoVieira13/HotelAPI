const express = require('express');
let QuartosAPI = require('./Server/quartos');
let AuthAPI = require('./Server/auth');
const cors = require('cors');


function initialize() {
    let api = express();

    api.use(cors())
    api.use('/quartos', QuartosAPI());
    api.use('/auth', AuthAPI());

    return api;
}

module.exports = {
    initialize: initialize,
};