/*
 Primer proyecto de paradigmas de programación.
 Sudoku.
 II Ciclo 2017.
 Universidad Nacional de Costa Rica.
 Cynthia Madrigal Quesada 1-1510-0465 Grupo:10:00 a.m.
 #
 #
 #
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var sudoku = new Schema({
    casillas: {type: Array},
    dificultad: {type: String},
    numeros: {type: Array}
});

module.exports = mongoose.model('model', sudoku);