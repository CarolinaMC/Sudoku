/*
 Primer proyecto de paradigmas de programación.
 Sudoku.
 II Ciclo 2017.
 Universidad Nacional de Costa Rica.
 Cynthia Madrigal Quesada 1-1510-0465 Grupo:10:00 a.m.
 Greivin Rojas Hernandez 4-0211-0725 Grupo:10:00 a.m.  
 Elena Carolina Mora Cordero 1-1553-0351 Grupo:10:00 a.m. 
 Daniel Mora Cordero 1-1473-0950 Grupo:10:00 a.m. 
 */

const {Generador} = require('./Generador');
const {Numero} = require('./Numero');
const {Util} = require('./Util');

/*
	Diferentes dificultades
	el valor numerico representa las casillas que serán ocultadas dependiendo de la dificultad
*/
const dificultades = {
    'Facil': 16,
    'Medio': 32,
    'Dificil': 64
};

class Sudoku {
    constructor(Generador, dificultad = "Facil") {
        this.Generador = Generador;
        this.dificultad = dificultades[dificultad];
        this.casillasPorOcultar = this.dificultad;
        this.numeros = Util.genArr(1, 81);/*para emular un for del 1 al 81*/
        this.casillas = null;/*representación del sudoku*/
        this.filaActual = 0;
        this.colActual = 0;
        this.init();
        this.Generador = null;//evitar que la petición del cliente no sea pesada, ahorrar espacio en mongo
    }
    init() {
		/*crea una representación del sudoku en base al generador*/
        this.casillas = this.numeros.map(
                e => this.getNumero()
        );
        this.ocultarElementos();
    }
    getNumero() {
		/*Obtiene el bloque según la (fila,columna) acutual*/
        let bloque
                = this.Generador.casillas[
                        this.Generador.getCasilla(
                                this.filaActual,
                                this.colActual)
                ];
		/*obtiene el valor contenido en la (fila,columna) acutal*/
        let elemento =
                bloque.elementos[
                        bloque.getPos(
                                this.filaActual % 3,
                                this.colActual % 3)
                ];
		/*Crea el numero cona información necesaria
		 más adelante se le indicará si será visible o no
		*/
        let nuevo = new Numero(
				elemento,
                this.filaActual,
                this.colActual
                );
        this.colActual++;
        (this.colActual = this.colActual % 9) === 0 ?
                (++this.filaActual)
                : 0;
        return nuevo;
    }

    ocultarElementos() {
		/*
			de manera aleatoria pone en false la visibilidad de una cantidad de numeros
			determinada por la dificultad
		*/
        Util.genArr(1, this.dificultad).forEach(
                e => {
                    let rand = Util.rand(0, this.numeros.length - 1);//selecciona un valor random
                    //selecciona un valor random
                    let elemento = this.numeros.splice(rand, 1);//lo saca del arreglo para no repetirlo
                    this.casillas[elemento].visible = false;
                }
        );

    }

}

module.exports = {
    Sudoku
};
