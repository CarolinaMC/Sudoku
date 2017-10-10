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
class Numero {
    constructor(valor, fila, columna, visible = true, correcto = true) {
        this.valor = visible ? valor : 0;
        this.fila = fila;
        this.columna = columna;
        this.visible = visible;
        this.correcto = correcto;
    }
}

module.exports = {
    Numero
};
