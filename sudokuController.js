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
		res.status(200).jsonp({sudoku:sudoku});
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
	  numeros : sudoku.numeros
	 // ip: sudoku.ip
	}) 

	model.save((err, sudoku)=>{
		if(err) { 
			console.log("error"+ err)
			return res.status(500).send( err.message);
		} 
		let schema = sudoku.schema;
		sudoku.generador = null;		
		res.status(200)
		   .json({sudoku:sudoku});
	});
};

/*
*Función encargada de guardar el estado del sudoku
*recibe al sudoku en notación JSON en el parametro sudoku
*retorna 200 en el caso de que se guardara bien
*        500 en caso de algún fallo.
*/
exports.updateSudoku =(req, res)=>{
	console.log("***GUARDANDO SUDOKU***");
	let sudoku = JSON.parse(req.params.sudoku);
	console.log(`--- ${sudoku._id}---`);
	SUDOKU.findOneAndUpdate(
					{_id:sudoku._id},
					sudoku,
					(err,ok)=> err ? res.send(500,{error:err})
								   : res.status(200).jsonp({mensaje:"ok"})
			);
};

exports.deleteSudoku = function(req, res) {
	SUDOKU.findById(req.params.id, function(err, sudoku) {
		sudoku.remove(function(err) {
			if(err) return res.status(500).send(err.message);
      res.status(200).send();
		})
	});
};



exports.deleteAll = (req,res)=>
	SUDOKU.remove({}, err=> 
            (err)?console.log(err)
				 :res.end('success')    
    );

