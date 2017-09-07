var mongoose = require('mongoose');
var Sudoku  = require('./models/model');
sudo     = require("./public/js/Sudoku"),
generador     = require("./public/js/Generador");

exports.findAllSudokus = function(req, res) {
	Sudoku.find(function(err, sudokus) {
    if(err) res.send(500, err.message);

    console.log('GET /sudokus')
		res.status(200).jsonp(sudokus);
	});
};

exports.findSudokuById = function(req, res) {
	Sudoku.findById(req.params.id, function(err, sudoku) {
    if(err) return res.send(500, err.message);

    console.log('GET /tvshow/' + req.params.id);
		res.status(200).jsonp(sudoku);
	});
};

exports.addSudoku = function(req, res) {
	console.log('POST');
	console.log(req.body);
	
	let dificultad = req.body.dificultad;
	var generador = new Generador();

	var sudoku = new Sudoku(generador,dificultad);
	sudoku.id =  new Date().getTime();
	sudoku.ip = req;

	sudoku.save(function(err, sudoku) {
		if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(sudoku);
	});
};

exports.updateSudoku = function(req, res) {
	Sudoku.findById(req.params.id, function(err, sudoku) {
		let generador;
		
		generador.dimensiones = req.body.dimensiones;
		        casillas = req.body.casillas;
		        numeros = req.body.numeros;
		        mapa = req.body.mapa;
				//cargo el genereador
		        sudoku.generador = generador;
                sudoku.dificultad = req.body.dificultad;
		        sudoku.casillasPorOcultar = req.body.casillasPorOcultar;
		        sudoku.numeros = req.body.numeros;
		        sudoku.casillas = req.body.casillas;
		        sudoku.filaActual = req.body.filaActual;
		        sudoku.colActual = req.params.colActual;
				sudoku.id =  new Date().getTime();
	            sudoku.ip = req;

		sudoku.save(function(err) {
			if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(tvshow);
		});
	});
};

exports.deleteSudoku = function(req, res) {
	Sudoku.findById(req.params.id, function(err, sudoku) {
		sudoku.remove(function(err) {
			if(err) return res.status(500).send(err.message);
      res.status(200).send();
		})
	});
};