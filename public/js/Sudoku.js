const {Generador} = require('./Generador')
const {Numero} = require('./Numero')
const {Util} = require('./Util');
const {Numero} = require('./Numero');
const dificultades = {
      'Facil'   :  16,
	  'Medio'   :  32,
	  'Dificil' :  64
}
class Sudoku{
	constructor(Generador,dificultad){
		this.Generador = Generador;
		this.dificultad = dificultades[dificultad];
		console.log(dificultad);
		this.casillasPorOcultar = this.dificultad;
		this.numeros = Util.genArr(1,81);
		this.casillas = null;
		this.filaActual = 0;
		this.colActual = 0;
		this.init();
		this.Generador = null;
		this.id = "?";//agregar a la hora de guardar
		this.ip = "?"; // obtener del request a la hora de guardar
	}
	init(){
		this.casillas = this.numeros.map(
			e=>this.getNumero()
		);
		this.casillas.forEach(e=>console.log(e));
		this.ocultarElementos();
	}
	getNumero(){
		let casilla  
		= this.Generador.casillas[
								this.Generador.getCasilla(
									this.filaActual,
									this.colActual)
								];
		let elemento =
			casilla.elementos[
				casilla.getPos(
					this.filaActual%3,
					this.colActual%3)
			]
		let nuevo = new Numero( elemento,
								this.filaActual,
								this.colActual
								);
		this.colActual++;
		(this.colActual = this.colActual%9) === 0 ?
			(++this.filaActual)
			:0;	
		return nuevo;	
	}
	
	ocultarElementos(){
		Util.genArr(1,this.dificultad).forEach(
			e=>{
				let rand = Util.rand(0,this.numeros.length-1);
				//selecciona un valor random
				let elemento = this.numeros.splice(rand,1);
				this.casillas[elemento].valor = 0;
				this.casillas[elemento].visible = false;
			}
		);
		
	}//obtener indice random y ocultar
	
	mostrar(){
		let i = 0;
		for(let j = 0;j<9;j++)
			console.log(`${this.casillas[i++].valor} | ${this.casillas[i++].valor}|${this.casillas[i++].valor}||${this.casillas[i++].valor}|${this.casillas[i++].valor}|${this.casillas[i++].valor}||${this.casillas[i++].valor}|${this.casillas[i++].valor}|${this.casillas[i++].valor}`);
		
	}

}

module.exports = {
	Sudoku
}


m = new Sudoku(new Generador(),"Facil");