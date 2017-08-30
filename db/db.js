
var mongoose = require ("mongoose");//gestiona nuestra pagina en el servidor
var db_lnk= 'mongodb://localhost/Sudoku';
var db = mongoose.createConnection(db_lnk);
mongoose.Promise = global.Promise;

var modelo_Sudoku=require('../models/model.js'),
	Sudoku=db.model('sudoku', modelo_Sudoku)
	
var insertar=function(req, res, next){
		var nuevoSudoku=new sudoku({
			generador: req.body.sudoku,
			num:req.body.sudoku,
			ip: req.body.sudoku,
			id:req.body.sudoku 
		});
		nuevoSudoku.save(onSaved);
		function onSaved(err){
			if(err){
				console.log(err);
			}else{
				//falta poner el mensaje 			
			}
			
		}
	
}

 var sudokuSchema= mongoose.Schema({
	 generador:{type: Object}, //llega el arreglo del sudoku
	 num:{type:String},//falta
	 ip: {type: String, required: true},//falta
	 id:{type:String, required: true}
 });

 var generador = mongoose.model('Generador',sudokuSchema);

 //Load
 module.exports.getsudokuById = function(idSudoku){
	 let query = generador.findOne({id:idSudoku});
	 return query.exec(); }


 //Save
 module.exports.savesudoku = function(dato, idSudoku){ //devuelvo el s junto con su id
	 var newSudoku = new sudoku({generador:dato, id:idSudoku});
	 return newSudoku.save();
 }
