/*
 Primer proyecto de paradigmas de programación.
 Sudoku.
 II Ciclo 2017.
 Universidad Nacional de Costa Rica.
 Cynthia Madrigal Quesada 1-1510-0465 Grupo:10:00 a.m.
 #
 #
 #
 */

const {Util} = require('./Util');
class Cuadricula {
    constructor(id) {
        this.id = id;
        this.dimensiones = 3;
        this.marcados = Util.genArr(1, 9, false);
        this.elementos = Util.genArr(1, 9, -1);
    }
    getFila(fila) {
        return fila < 0 || fila >= this.dimensiones ? []
                : Util.genArr(0, this.dimensiones - 1)
                .reduce(((a, e) =>
                    a.concat(
                            this.elementos[e + fila * this.dimensiones]))
                        , []);
    }
    getCol(col) {
        let aux = [0, 2, 4];
        return col < 0 || col >= this.dimensiones ? []
                : Util.genArr(0, this.dimensiones - 1)
                .reduce((a, e) =>
                    a.concat(
                            this.elementos[(e + aux[e]) + col])
                , []);
    }

    insert(elemento, fila, col) {
        let pos = this.getPos(fila % 3, col % 3);
        this.elementos[pos] = elemento;
        this.marcados[elemento - 1] = true;
    }
    sacar(elemento, fila, col) {
        let pos = this.getPos(fila % 3, col % 3);
        this.elementos[pos] = -1;
        this.marcados[elemento - 1] = false;
    }
    getPos(fila, col) {
        return fila === 0 && col === 0 ? 0 :
                fila === 0 && col === 1 ? 1 :
                fila === 0 && col === 2 ? 2 :
                fila === 1 && col === 0 ? 3 :
                fila === 1 && col === 1 ? 4 :
                fila === 1 && col === 2 ? 5 :
                fila === 2 && col === 0 ? 6 :
                fila === 2 && col === 1 ? 7 :
                8;
    }

    existeElemento(elemento) {
        return this.marcados[elemento - 1];
    }

}

module.exports = {
    Cuadricula
};