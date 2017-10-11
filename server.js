/*
Primer proyecto de paradigmas de programación.
Sudoku.
II Ciclo 2017.
Universidad Nacional de Costa Rica.
Cynthia Madrigal Quesada 1-1510-0465 Grupo:10:00 a.m. 1-1510-0465 Grupo:10:00 a.m.
Greivin Rojas Hernadez 4-0211-0725 Grupo:10:00 a.m. 4-0211-0725 Grupo:10:00 a.m.
Elena Carolina Mora Cordero 1-1553-0351 Grupo:10:00 a.m. 1-1553-0351 Grupo:10:00 a.m.
Daniel Mora Cordero 1-1473-0950 Grupo:10:00 a.m. 1-1473-0950 Grupo:10:00 a.m.
*/
/***********************valores*********************/
const schema = "sudoku";
const url = 'mongodb://localhost/sudokus';
/**************************************************/

/*********************importaciones****************/
const express = require('express'),
        //db = require("./db/db");
        bodyParser = require('body-parser'),
        app = express(),
        morgan = require('morgan'),
        fs = require('fs'),
        //mongodb    = require('mongodb'),
        mongoose = require("mongoose"),
        sudoku = require("./public/js/Sudoku"),
        generador = require("./public/js/Generador"),
        timeout = require('connect-timeout');
var sudokuCtrl = require('./sudokuController');


console.log("require's: ok");
/*************************************************/


/****************configuración de app*************/
app.use(express.static('public'));///acceso a los archivos
app.use(morgan('dev'));///logger
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true
}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(timeout('10s'));
//app.post('/insertar', mongodb.insertar );
console.log("app configurada");
/**************************************************/

/******************ruteo con express******************/
const port = process.env.PORT || 8080;
const router = express.Router();
router.use((req, res, next) => {
    console.log('entrada.');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.set('port', port)

app.get('/', (req, res)=> {
    res.json({mensaje: 'Respuesta JSON'});
});
/******************************************************/

/***************************acciones****************/
const objectText = result => result.text();

router.get('/', (req, res) => {
    res.json({message: 'SUDOKU'});
});

///////////////////////////////////////////////////////////////////////////////
// CONNECT TO DB
mongoose.connect(url,
        {
            useMongoClient: true
        }
);


const haltOnTimedout = (req, res, next) => {
    (!req.timedout)?
        next()
        :0;
};


router.route('/game/:dificultad')
        .get(sudokuCtrl.findAllSudokus)
        .post(sudokuCtrl.addSudoku);

router.route('/sudokus/:id')
        .get(sudokuCtrl.findSudokuById)
        .delete(sudokuCtrl.deleteSudoku);

router.route('/save/:sudoku')
        .put(sudokuCtrl.updateSudoku);


router.route('/deleteAll')
        .delete(sudokuCtrl.deleteAll);

/****************************iniciando el servidor*/
app.use('/api', router);


app.listen(port, (err, res) => {
    console.log("Node server listo " + port);
});


console.log("***Server corriendo***");
