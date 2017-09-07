var mongoose=require('mongoose'),
Schema = mongoose.Schema;

var sudoku=new Schema({
	
	 generador:{
		 dimensiones : { type: String}, 
	     casillas : { type: Array},
         numeros : { type: Array},
         mapa : {type: Array}
		 }, //guarda el generador
		 
	    dificultad : {type: String},
		casillasPorOcultar : {type: String},
		numeros : { type: Array},
		filaActual : { type: String},
		colActual : { type: String},
	    ip: {type: String, required: true},
	    id:{type:String, required: true}

})

module.exports = mongoose.model('model', sudoku);