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

class Util {
    /**
     Genera un array con numeros desde <<desde:int>>
     hasta <<hasta:int>> llenandolo de <<llenoDe:?>>
     si es que <<llenoDe>> es distinto de indefinido
     en caso contrario lo llena de numeros consecutivos
     @param desde numero minimo en el array
     @param hasta numero máximo que tendrá el array, inclusivo
     @param llenoDe elemento con el cual se llenará el array
     */
    static genArr(desde = 0, hasta = 0, llenoDe) {
        return Array.from(
                {length: (hasta - (desde)) + 1},
                (v, i) => llenoDe !== undefined ? llenoDe
                    : (i + desde));
    }
    /**
     @param min numero minimo que se desea obtener en el random
     @param max numero maximo que se desea obtener en el random
     Genera un número random entre <<min>> y <<max>>
     */
    static rand(min, max) {
        return parseInt(Math.random() * (max - min) + min);
    }

    /**
     @param arr arreglo que se desea desordenar
     Desordena de manera aleatora al arr 
     */
    static desordenar(arr) {
        let desordenarAux = (array, indice) => 
           indice === 0 ? array
                    : desordenarAux(
                            array.concat(
                                    array.splice(
                                            Util.rand(0, indice+1), 1))
                            , indice - 1
                            );
                    
        return desordenarAux(arr, arr.length - 1);
    }
    static between(a, b, c) {
        return a <= c && c <= b;
    }

    static sacarPrimero(arr) {
        return arr.concat(arr.splice(0, 1)).pop();
    }
	static siSino(condicion,x,y){
        let aux = ()=>{}
        y = y||aux;
        return condicion  ? x() : y();
    }
     
}
