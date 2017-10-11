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
class Generador {
    constructor() {
        this.dimensiones = 3;
        this.casillas = Util.genArr(1, 9);
        this.numeros = Util.genArr(1, 9);
        this.mapa = Util.genArr(1, 9);
        this.casillas = this.casillas.map(
                (e, i) => e = new Cuadricula(i)
        );
        this.mapa = this.casillas.map(
                (e, i) => e = Util.genArr(1, 9, false)
        );
        this.init();
    }
    init() {
        this.llenar();
    }

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

    marcar(fila, columna, elemento) {
        let casilla = this.getCasilla(fila, columna);
        this.casillas[casilla].insert(elemento, fila, columna);
        this.mapa[columna][elemento - 1] = true;
    }
    desmarcar(fila, columna, elemento) {
        let casilla = this.getCasilla(fila, columna);
        this.casillas[casilla].sacar(elemento, fila, columna);
        this.mapa[columna][elemento - 1] = false;
    }
    posiblesJugadas(fila, columna, elementosDeLaFila) {
        let elementosDelaCol = this.mapa[columna].reduce(
                (a, e, i) => e ? a : a.concat([i + 1])
        , []);
        let casilla = this.casillas[this.getCasilla(fila, columna)];
        let validos = elementosDelaCol.filter(
                e =>
            (!casilla.existeElemento(e))
                    && (!elementosDeLaFila.some(el => el === e))
        );
        return validos;
    }

    llenar() {
        this.llenarPrimera();
        this.terminarDeLlenar();
        this.llenarUltimaFila();
    }

    llenarPrimera() {
        this.numeros = Util.desordenar(this.numeros);
        this.numeros.forEach((e, col) => this.marcar(0, col, e));
    }

    llenarUltimaFila() {
        Util.genArr(0, 8).forEach(
                e => this.llenarUltimaCol(e)
        );
    }
    llenarUltimaCol(col) {
        let elemento = this.mapa[col].reduce(
                (a, e, i) => e ? a : i + 1
        , 0);
        this.marcar(8, col, elemento);
    }

    terminarDeLlenar() {
        Util.genArr(1, 7).forEach(
                fila => this.llenarFila(fila)
        );
    }
    llenarFila(fila, columna = 0, elementosDeLaFila = []) {
        let posiblesJugadas =
                this.posiblesJugadas(fila, columna, elementosDeLaFila);
        return this.backTracking(fila, columna, elementosDeLaFila, posiblesJugadas);
    }
    backTracking(fila, columna = 0, elementosDeLaFila = [], posiblesJugadas) {
        return Util.siSino(
                posiblesJugadas.length === 0,
                () => false,
                () => {
            elementosDeLaFila.push(posiblesJugadas[0]);
            let elemento = Util.sacarPrimero(posiblesJugadas);
            this.marcar(fila, columna, elemento);
            
            return Util.siSino(
                    columna === 8,
                    () => true,
                    () => Util.siSino(
                        this.llenarFila(
                                fila
                                , columna + 1
                                , elementosDeLaFila),
                        () => true,
                        () => {
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
