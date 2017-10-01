var mongoose=require('mongoose'),
Schema = mongoose.Schema;

var sudoku=new Schema({
	
	 generador:{
		 dimensiones : { type: String}, 
         numeros : { type: Array},
		 casillas : { type: Array},
         mapa : {type: Array}
		 }, //guarda el generador
	  casillas : { type: Array},	 
	  dificultad : {type: String},
	  numeros : { type: Array}
	 // ip: {type: String, required: true}

})

module.exports = mongoose.model('model', sudoku);