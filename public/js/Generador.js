/*
 Primer proyecto de paradigmas de programación.
 Sudoku.
 II Ciclo 2017.
 Universidad Nacional de Costa Rica.
 Cynthia Madrigal Quesada 1-1510-0465 Grupo:10:00 a.m.
 Greivin Rojas Hernadez 4-0211-0725 Grupo:10:00 a.m. 4-0211-0725 Grupo:10:00 a.m.
 Elena Carolina Mora Cordero 1-1553-0351 Grupo:10:00 a.m. 1-1553-0351 Grupo:10:00 a.m.
 Daniel Mora Cordero 1-1473-0950 Grupo:10:00 a.m. 1-1473-0950 Grupo:10:00 a.m.
 #
 #
 #
 */

const {Util} = require('./Util');
const {Cuadricula} = require('./Cuadricula');
/*
	Clase encargada de generar el Sudoku
*/
class Generador {
    constructor() {
		/*this.casillas: Array que contendrá cada uno de los bloques(cuadriculas) del Sudoku*/
        this.casillas = Util.genArr(1, 9);
		/*this.numeros: array que servirá para generar al Sudoku*/
        this.numeros = Util.genArr(1, 9);
		/*this.mapa: Un array de Arrays, en los cuales se contendrá un mapa booleano de las columnas del Sudoku
		             pj: Si el this.mapa[0][2] es true, quiere decir que en la primera columna 
					 ya existe el 3 (por posición en el vector)
		*/
        this.mapa = Util.genArr(1, 9);
        this.casillas = this.casillas.map(
                (e, i) => e = new Cuadricula(i)
        );
        this.mapa = this.casillas.map(
                (e, i) => e = Util.genArr(1, 9, false)
        );
        this.llenar();
    }
	/*Retorna la posición de la cuadricula correspondiente a la @fila y @col enviadas por párametro*/
    getCasilla(fila, col) {
        return Util.between(0, 2, fila) && Util.between(0, 2, col) ? 0 :
                Util.between(0, 2, fila) && Util.between(3, 5, col) ? 1 :
                Util.between(0, 2, fila) && Util.between(6, 8, col) ? 2 :
                Util.between(3, 5, fila) && Util.between(0, 2, col) ? 3 :
                Util.between(3, 5, fila) && Util.between(3, 5, col) ? 4 :
                Util.between(3, 5, fila) && Util.between(6, 8, col) ? 5 :
                Util.between(6, 8, fila) && Util.between(0, 2, col) ? 6 :
                Util.between(6, 8, fila) && Util.between(3, 5, col) ? 7 :
                8;
    }
	/*Inserta un @elemento en una @fila y @columna determinada, marcanda además en el mapa de elementos*/
    marcar(fila, columna, elemento) {
        this.casillas[this.getCasilla(fila, columna)].insert(elemento, fila, columna);
        this.mapa[columna][elemento - 1] = true;
    }
	/*elimina un @elemento en una @fila y @columna determinada, marcanda además en el mapa de elementos*/
    desmarcar(fila, columna, elemento) {
        this.casillas[this.getCasilla(fila, columna)].sacar(elemento, fila, columna);
        this.mapa[columna][elemento - 1] = false;
    }
	/*Retorna un array con los numeros que se pueden colocar en una determinada @fila y @columna
	  Basandose en los @elementosDeLaFila y el mapa de elementos
	*/
    posiblesJugadas(fila, columna, elementosDeLaFila) {
		//devuelve los elmentos que se pueden jugar en la columna
        let elementosDelaCol = this.mapa[columna].reduce(
                (a, e, i) => e ? a : a.concat([i + 1])
        , []);
		//Luego verifica que esos elementos no se encuentren ni en la cuadricula ni en la fila
        let casilla = this.casillas[this.getCasilla(fila, columna)];
        let validos = elementosDelaCol.filter(
                e =>
            (!casilla.existeElemento(e))
                    && (!elementosDeLaFila.some(el => el === e))
        );
        return validos;
    }
	/*Método encargado de generar el Sudoku*/
    llenar() {
        this.llenarPrimera();
        this.terminarDeLlenar();
        this.llenarUltimaFila();
    }
	/*Método encargado de Rellenar la primera fila del Sudoku*/
    llenarPrimera() {
		//toma un vector con numeros del 1 al 9 y lo desordena
        this.numeros = Util.desordenar(this.numeros);
		//para luego insertar cada uno de los elementos en la primera fila del Sudoku
        this.numeros.forEach((e, col) => this.marcar(0, col, e));
    }

	/*Método encargado de llenar la Ultima fila basandose en los elementos que ya se jugaron en esa columna*/
    llenarUltimaFila() {
        Util.genArr(0, 8).forEach(
                e => this.llenarUltimaCol(e)
        );
    }
	
	/*Método encargado de llenar la ultima fila de una determinada @col basandose en el mapa de los elementos
		jugados en la columna	*/
    llenarUltimaCol(col) {
        let elemento = this.mapa[col].reduce(
                (a, e, i) => e ? a : i + 1
        , 0);
        this.marcar(8, col, elemento);
    }
	/*Método encargado de llenar todas las filas, excepto la primera y la última*/
    terminarDeLlenar() {
        Util.genArr(1, 7).forEach(
                fila => this.llenarFila(fila)
        );
    }
	/*Método encargado de llenar una determinada @fila
	 @columna representará la columna actual
	 @elementosDeLaFila irá almacenando los elementos que se vayan generando en la fila
	*/
    llenarFila(fila, columna = 0, elementosDeLaFila = []) {
		let posiblesJugadas =
                this.posiblesJugadas(fila, columna, elementosDeLaFila);
        return this.backTracking(fila, columna, elementosDeLaFila, posiblesJugadas);
    }
	/*
		Método encargado de generar el sudoku de manera recursiva, garantizando por medio de
		backTracking que los elementos se generaran con repeticiones
		@fila fila que se esta llenando actualmente
		@columna columna en la que se esta actualmente
		@elementosDeLaFila elementos existentes en la fila
		@posiblesJugadas posibles jugadas que se pueden hacer en la fila
	*/
    backTracking(fila, columna = 0, elementosDeLaFila = [], posiblesJugadas) {
        /*si ya no hay posibles jugadas retorna false, para que el backTracking busque otras alternativas*/
		return Util.siSino(
                posiblesJugadas.length === 0,
                () => false,
                () => {
			/*toma la primera posible jugada y la indica como un elemento de la fila*/		
            elementosDeLaFila.push(posiblesJugadas[0]);
			/*Elemina al primer elemento de las posibles jugadas, y lo marca en el sudoku*/
            this.marcar(fila, columna, Util.sacarPrimero(posiblesJugadas));
            /*si se logro llegar a la columna 8 sin conflictos, retorna true para que
			se siga con la siguiente fila*/
			return Util.siSino(
                    columna === 8,
                    () => true,
                    () => Util.siSino(
						/*prosigue llenando en la misma fila, siguiente columna*/
                        this.llenarFila(
                                fila
                                , columna + 1
                                , elementosDeLaFila),
						/*si se logro llenar retornar true para poder proseguir*/		
                        () => true,
                        () => {
							/*si no se logra llenar la columna desmarca la ultima jugada
							 quita al elemento de los elementos de la fila 
							 y prosigue con el backTracking omitiendo esa posible jugada
							*/
                    this.desmarcar(fila, columna, elemento);
                    elementosDeLaFila.pop();
                    return this.backTracking(fila, columna, elementosDeLaFila, posiblesJugadas);
                }
                )
            );
        }
        );


    }

}
module.exports = {
    Generador
};
