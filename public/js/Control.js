/*
 Primer proyecto de paradigmas de programación.
 Sudoku.
 II Ciclo 2017.
 Universidad Nacional de Costa Rica.
 Cynthia Madrigal Quesada 1-1510-0465 Grupo:10:00 a.m..
 Greivin Rojas Hernadez 4-0211-0725 Grupo:10:00 a.m. 4-0211-0725 Grupo:10:00 a.m.
 Elena Carolina Mora Cordero 1-1553-0351 Grupo:10:00 a.m. 1-1553-0351 Grupo:10:00 a.m.
 Daniel Mora Cordero 1-1473-0950 Grupo:10:00 a.m. 1-1473-0950 Grupo:10:00 a.m.
 #
 #
 #
 */

/* global control, dificil, medio, facil, path_sudoku_id, path_sincronizado, path_ganado, path_sudoku, rutaGetById, host, fetch, port, api, rutaAdd */

class Control {
    constructor() {
        this.view = new View();
        let id = localStorage.getItem(path_sudoku_id);
        id ? this.verificarExisteSudoku()
                : 0;
    }
	//inicializa las variables necesarias
    inicializarVariables() {
        this.ajustarLocal(false);
        this.sincronizado = localStorage.getItem(path_sincronizado);
        this.sincronizado = this.sincronizado == "undefined" ? true
                : JSON.parse(localStorage.getItem(path_sincronizado));
        this.juegoGanado = localStorage.getItem(path_ganado);
        this.juegoGanado = this.juegoGanado == "undefined" ? true
                : JSON.parse(localStorage.getItem(path_ganado));
    }
	//verifica la existencia de un sudoku pendiente, de ser así lo carga al iniciar la pagina
    verificarExisteSudoku() {
        this.inicializarVariables();
        !this.sincronizado ?
                this.cargarYSincronizar()/*para que se sincronice*/
                : this.sudokuDB();

    }
	//Carga al sudoku del localStorage y luego lo envia a guardar a la base de datos
    cargarYSincronizar() {
        this.sudokuLocal();
        this.guardarSudoku();
    }

	//Usa a un web worker para intentar salvar en la base de datos
	//Si no logra conectarse a la base de datos, guardará en localStorage
    guardarSudoku() {
        let jsonSudoku = JSON.stringify(this.view.modelo.sudoku);
        const worker = new Worker("js/webWorkerUpdate.js");
        worker.onmessage = evento => {
            this.sincronizado = evento.data === 200;//verifica que se haya podido guardar
            this.sincronizado ? (this.view.mensaje("CONEXIÓN ESTABLECIDA CON LA BASE DE DATOS"),
                    this.view.clickOnLine())
                    : (this.view.mensaje("NO SE HA LOGRADO CONECTAR CON LA BASE DE DATOS, SU JUEGO SERÁ GUARDADO EN CUANTO SE PUEDA SINCRONIZAR"
                            , "red", 5000),
                            this.view.clickOffLine());
            this.guardarVariables();
            accionEnCurso = false;//bandera para evitar que se le de varios clicks al boton de guardar

        };
        worker.postMessage(jsonSudoku);
        /*se intenta conectar y guardar, si se guarda, se pasa la sincronizado a true y se limpiar el localStorage
         sino, se mantiene el sudoku en el localStorage
         **/
    }
	//guarda variables necesarias en el localStorage, para poder continuar un juego pendiente
    guardarVariables() {
        localStorage.setItem(path_sincronizado, this.sincronizado);
        localStorage.setItem(path_ganado, this.juegoGanado);
        localStorage.setItem(path_sudoku_id, this.view.modelo.sudoku._id);
        localStorage.setItem(path_sudoku, JSON.stringify(this.view.modelo.sudoku));
    }
	
	//Cambia al sudoku de la vista
    setSudoku(sudoku) {
        this.view.init(sudoku);
        localStorage.setItem(path_sudoku_id, this.view.modelo.sudoku._id);
        this.guardarVariables();
    }
	//cambia el estado para indicar si el juego esta online u offline
    ajustarLocal(estado) {
        this.juegoLocal = estado;
    }
	//Se encarga de ajustar variables que indiquen que se esta jugando offline, y además almacena 
	//Al sudoku en el localStorage
    sudokuLocal() {
        this.sincronizado = false;
        this.view.clickOffLine();
        let sudoku_local = JSON.parse(localStorage.getItem(path_sudoku));
        this.setSudoku({sudoku: sudoku_local});
    }
	//Remueve las variables del localStorage
    limpiarLocalStorage() {
        localStorage.removeItem(path_sincronizado);
        localStorage.removeItem(path_ganado);
        localStorage.removeItem(path_sudoku);
        localStorage.removeItem(path_sudoku_id);
    }
	//verifica si se debe traer el sudoku de la base de datos
    sudokuDB() {
        let id = localStorage.getItem(path_sudoku_id);
        !this.ganado && id !== undefined ? this.getSudoku(id)
                : this.limpiarLocalStorage();
    }
	
	//Obtiene un sudoku por medio del id 
    getSudoku(id) {
        fetch(`http://${host}:${port}/${api}/${rutaGetById}/${id}`, {
            method: 'GET'
        })
                .then(res => res.json())
                .then(sdk => {
                    this.setSudoku(sdk);
                    this.view.clickOnLine();
                    this.sincronizado = true;
                })
                .catch(ex => {
                    this.view.clickOffLine();
                    this.sudokuLocal();
                });
    }
	//verifica las casillas no jugadas o erroneas para poner el valor correcto a la casilla
    pedirPista() {
        /*recupera todos los elementos que no son visibles
         y que se les ha ingresado un valor, y dicho valor no es correcto
         */
        let opciones = this.view
                .modelo
                .sudoku
                .casillas
                .filter(e => !e.visible && e.valor != e.valorDigitado);
        opciones.length === 0 ? this.view.mensaje(mensajeNoPistas, "#868A08",4500)
                : this.seleccionarPista(opciones);
    }
	//Selecciona aleatoreamente que valor se dará en la pista
    seleccionarPista(opciones) {
        let dato = opciones[ Util.rand(0, opciones.length - 1)];
        dato.seDigito = true;
        dato.valorDigitado = dato.valor;
        let key = `f${dato.fila}c${dato.columna}`;
        let caja = $(`#${key} > :input`)[0];
        caja.value = dato.valor;
        this.view.marcarPista(caja.id);
    }
	
	//verifica si las jugadas realizadas son correctas o no
	//notifica al usuario cambiando el color de las casillas
    verificarJugadas() {
        this.view.modelo
                .sudoku
                .casillas
                .filter(e => e.seDigito && e.valorDigitado !== "")
                .forEach(
                        dato => {
                            let key = `f${dato.fila}c${dato.columna}`;
                            let caja = $(`#${key} > :input`)[0];
                            dato.valorDigitado == dato.valor ?
                                    this.view.marcarOk(caja.id)
                                    : this.view.marcarError(caja.id);
                        }
                );

    }
	//Restablece al sudoku a su punto original
    resetear() {
        this.view.modelo.sudoku.casillas =
                this.view.modelo
                .sudoku
                .casillas
                .map(
                        dato => {
                            dato.seDigito = undefined;
                            dato.valorDigitado = undefined;
                            let key = `f${dato.fila}c${dato.columna}`;
                            !dato.visible ?
                                    $(`#${key} > :input`)[0].value = ""
                                    : 0;
                            return dato;
                        }
                );
        this.guardarSudoku();
    }
	/*Muestra el valor correcto de todas las casillas jugables*/
    mostrarSolucion() {
        this.view.modelo.sudoku.casillas =
                this.view.modelo
                .sudoku
                .casillas
                .map(
                        dato => {

                            let key = `f${dato.fila}c${dato.columna}`;
                            let caja = $(`#${key} > :input`)[0];
                            !dato.visible ?
                                    (
                                            caja.value = dato.valor,
                                            dato.seDigito = true,
                                            dato.valorDigitado = dato.valor
                                            ) : 0;
                            $(caja).css("font-size", "20px");
                            $(caja).animate({
                                "color": "purple"
                            }, 2500, () => $(caja).animate({
                                    "font-size": "14px",
                                    "color": "blue"
                                }, 2500
                                        ));
                            return dato;
                        }
                );
    }
	/*Al terminar la partida, verifica si todas las jugadas fueron correctas
	  E indica por medio de un mensaje el resultado
	*/
    eventoGano() {
        this.gano() ?
                this.view.mensaje(mensajeGano)
                : this.view.mensaje(mensajeNoGano, "red");
        this.limpiarLocalStorage();
        $("#panelBotones").fadeOut();
        $("#jugarOtraVez").removeClass("hide");

    }

	/*Verifica que todas las jugadas fueron correctas*/
    gano() {
        return this.view.modelo
                .sudoku
                .casillas
                .every(
                        e => e.visible || e.valorDigitado == e.valor
                );
    }
	//por medio del un web worker, envía la petición para que se genere y se guarde un nuevo sudoku
	//el cual será enviado al cliente
	//Si la conexión falla, el sudoku intentará generarse localemente
    prepararSudoku(dificultad) {
		const worker = new Worker("js/webWorkerAdd.js");
		worker.onmessage = evento =>{
			const respuestaOk=sdk=>{
				this.setSudoku(sdk);
                this.sincronizado = true;
			}
			const respuestaFallida=res=>{
				let generador = new Generador();
				let sudoku = new Sudoku(generador,dificultad);
				sudoku._id = new Date().getTime();
				localStorage.setItem(path_sudoku, JSON.stringify(sudoku));
				this.sudokuLocal();
			}
			evento.data === 500 ? respuestaFallida()
								: respuestaOk(evento.data);
		}
		this.juegoLocal ? this.sudokuLocal()
						: worker.postMessage(dificultad);
    }
}





