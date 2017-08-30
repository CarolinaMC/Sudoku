var Schema=require('mongoose').Schema;

var sudoku=new Schema({
	 generador:{type: Object}, //llega el arreglo del sudoku
	 num:{type:String},//falta
	 ip: {type: String, required: true},//falta
	 id:{type:String, required: true}

})

module.exports=sudoku;