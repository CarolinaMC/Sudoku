var mongoose = require('mongoose');
var SUDOKU  = require('./models/model');
    Sudoku     = require("./public/js/Sudoku").Sudoku,
    Generador    = require("./public/js/Generador").Generador; // {Generator : ...}

exports.findAllSudokus = function(req, res) {
	SUDOKU.find(function(err, sudokus) {
    if(err) res.send(500, err.message);

    console.log('GET /sudokus')
		res.status(200).jsonp(sudokus);
	});
};

exports.findSudokuById = function(req, res) {
	SUDOKU.findById(req.params.id, function(err, sudoku) {
    if(err) return res.send(500, err.message);

    console.log('GET /sudoku/' + req.params.id);
		res.status(200).jsonp(sudoku);
	});
};

exports.addSudoku = function(req, res) {
	console.log('POST');
	console.log(req.params.dificultad);
	
	let dificultad = req.params.dificultad;
	var generador = new Generador();

	var sudoku = new Sudoku(generador,dificultad);
	sudoku.id =  new Date().getTime();
	sudoku.ip = req;
	// var model = new SUDOKU();
	
	let model= new SUDOKU({
		generador:{
		 dimensiones : generador.dimensiones, 
	     casillas : generador.casillas,
         numeros : generador.numeros,
         mapa : generador.mapa
		 }, //guarda el generador
	  casillas : sudoku.casillas,	 
	  dificultad : sudoku.dificultad,
	  numeros : sudoku.numeros,
	  ip: sudoku.ip,
	  id: sudoku.id
	}) 

	model.save((err, sudoku)=>{
		if(err) { 
			console.log("error"+ err)
			return res.status(500).send( err.message);
		} 
		//for(p in )
		sudoku.generador = null;		
		res.status(200)
		   .json({sudoku:sudoku});
	});
};

exports.updateSudoku = function(req, res) {
	SUDOKU.findById(req.params.id, function(err, sudoku) {
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
	            //sudoku.ip = req;

		sudoku.save(function(err) {
			if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(tvshow);
		});
	});
};

exports.deleteSudoku = function(req, res) {
	SUDOKU.findById(req.params.id, function(err, sudoku) {
		sudoku.remove(function(err) {
			if(err) return res.status(500).send(err.message);
      res.status(200).send();
		})
	});
};