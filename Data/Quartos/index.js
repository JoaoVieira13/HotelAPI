const teste = require('./quartos');
const QuartosService = require('./service');
const Bedrooms = teste.Quarto;

const service = QuartosService(Bedrooms);

module.exports = service;