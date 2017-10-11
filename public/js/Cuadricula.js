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
/*
	Representación de cada uno de los 9 bloques del Sudoku
*/
class Cuadricula {
    constructor() {
        this.dimensiones = 3;
		//arreglos que ayudarán a generar al Sudoku
		//marcados: pj: si la pos 3 es true, quiere decir que (3-1) ya existe en ese bloque
		//          para poderlo usar como un tipo de hashmap
        this.marcados = Util.genArr(1, 9, false);
		//elementos: contiene todos los elementos que se han ido insertando
		//           no se usa para consultar si el dato ya existe, porque habría que hacer un recorrido secuencial
        this.elementos = Util.genArr(1, 9, -1);
    }
	/*
		Obtiene un arreglo con los datos que existen en una determinada @fila
	*/
    getFila(fila) {
        return fila < 0 || fila >= this.dimensiones ? []
                : Util.genArr(0, this.dimensiones - 1)
                .reduce(((a, e) =>
                    a.concat(
                            this.elementos[e + fila * this.dimensiones]))
                        , []);
    }
	/*
		Obtiene un arreglo con los datos que existen en una determinada @col
	*/
    getCol(col) {
        let aux = [0, 2, 4];
        return col < 0 || col >= this.dimensiones ? []
                : Util.genArr(0, this.dimensiones - 1)
                .reduce((a, e) =>
                    a.concat(
                            this.elementos[(e + aux[e]) + col])
                , []);
    }

	/*Inserta un @elemento en una determinada (@fila,@col)*/	
    insert(elemento, fila, col) {
        let pos = this.getPos(fila % 3, col % 3);//obtiene la posición en la que ira
        this.elementos[pos] = elemento;//lo agrega a los elementos existentes
        this.marcados[elemento - 1] = true;//lo marca como existente
    }
	/*Elimina un @elemento en una determinada (@fila,@col)*/	
    sacar(elemento, fila, col) {
        let pos = this.getPos(fila % 3, col % 3);//obtiene la posición de la cual se debe sacar
        this.elementos[pos] = -1; //lo elimina
        this.marcados[elemento - 1] = false; //lo marca como no existente
    }
	/*Retorna en que posición del vector de elementos se encuentra una determinada  (@fila,@col)**/
    getPos(fila, col) {
        return  fila === 0 && col === 0 ? 0 :
                fila === 0 && col === 1 ? 1 :
                fila === 0 && col === 2 ? 2 :
                fila === 1 && col === 0 ? 3 :
                fila === 1 && col === 1 ? 4 :
                fila === 1 && col === 2 ? 5 :
                fila === 2 && col === 0 ? 6 :
                fila === 2 && col === 1 ? 7 :
                8;
    }
	/*retorna true si un @elemento ya existe en el bloque*/
    existeElemento(elemento) {
        return this.marcados[elemento - 1];
    }

}

module.exports = {
    Cuadricula
};