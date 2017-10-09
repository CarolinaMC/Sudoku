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

let mongoose = require("mongoose");//gestiona nuestra pagina en el servidor
let db_lnk = 'mongodb://localhost/Sudoku';
let db = mongoose.createConnection(db_lnk);
mongoose.Promise = global.Promise;

let modelo_Sudoku = require('../models/model.js'),
        Sudoku = db.model('sudoku', modelo_Sudoku);

const insertar = (req, res, next) => {
    let nuevoSudoku = new sudoku({
        num: req.body.sudoku,
        ip: req.body.sudoku,
        id: req.body.sudoku
    });
    nuevoSudoku.save(onSaved);
    var onSaved = err => {
        console.log(err);
    };
};

let sudokuSchema = mongoose.Schema({
    generador: {type: Object}, //llega el arreglo del sudoku
    num: {type: String}, //falta
    ip: {type: String, required: true}, //falta
    id: {type: String, required: true}
});

let generador = mongoose.model('Generador', sudokuSchema);

//Load
module.exports.getsudokuById = idSudoku =>
    generador.findOne({id: idSudoku}).exec();


//Save
module.exports.savesudoku = (dato, idSudoku) =>
    new sudoku({generador: dato, id: idSudoku}).save();

