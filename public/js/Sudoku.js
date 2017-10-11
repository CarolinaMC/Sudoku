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

const {Generador} = require('./Generador');
const {Numero} = require('./Numero');
const {Util} = require('./Util');

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
        this.numeros = Util.genArr(1, 81);
        this.casillas = null;
        this.filaActual = 0;
        this.colActual = 0;
        this.init();
        this.Generador = null;
    }
    init() {
        this.casillas = this.numeros.map(
                e => this.getNumero()
        );
        this.ocultarElementos();
    }
    getNumero() {
        let casilla
                = this.Generador.casillas[
                        this.Generador.getCasilla(
                                this.filaActual,
                                this.colActual)
                ];
        let elemento =
                casilla.elementos[
                        casilla.getPos(
                                this.filaActual % 3,
                                this.colActual % 3)
                ];
        let nuevo = new Numero(elemento,
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
        Util.genArr(1, this.dificultad).forEach(
                e => {
                    let rand = Util.rand(0, this.numeros.length - 1);
                    //selecciona un valor random
                    let elemento = this.numeros.splice(rand, 1);
                    this.casillas[elemento].visible = false;
                }
        );

    }//obtener indice random y ocultar

}

module.exports = {
    Sudoku
};
