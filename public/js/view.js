/*
 Primer proyecto de paradigmas de programación.
 Sudoku.
 II Ciclo 2017.
 Universidad Nacional de Costa Rica.
 Cynthia Madrigal Quesada 1-1510-0465 Grupo:10:00 a.m..
 Greivin Rojas Hernandez 4-0211-0725 Grupo:10:00 a.m.  
 Elena Carolina Mora Cordero 1-1553-0351 Grupo:10:00 a.m. 
 Daniel Mora Cordero 1-1473-0950 Grupo:10:00 a.m. 

 */

/* global control, dificil, medio, facil, path_sudoku_id, path_sincronizado, path_ganado, path_sudoku, rutaGetById, host, fetch, port, api, rutaAdd */
class View {
    constructor() {
    }
	
	//Método encargado de reconstruir un Sudoku en la vista
    init(sudoku) {
        this.modelo = sudoku;
        if (this.modelo === undefined)
            throw "Sudoku no recuperado correctamente del servidor";
        
		this.modelo.sudoku.casillas.forEach((casillita, indice) => {
            let key = `#f${casillita.fila}c${casillita.columna}`;//genera la llave
            $(key).text("");//Recupera la posición que ocupará en la tabla
            $(key).append(
                    casillita.visible ?
                    `<div class="elemento">${casillita.valor}</div>`/*agrega el valor como una casilla no jugable*/
                    : (!casillita.seDigito) ?
                    `<input  id="caja_${indice}" class="caja"/>`/*casilla jugable con un valor*/
                    : `<input value="${casillita.valorDigitado}" id="caja_${indice}" class="caja"/>`/*casilla jugable*/

                    );
        });
		//se inicializa los eventos de las casillas jugables
        this.eventoCaja();
        $("#divJugar").show();
		$("#tablero").show();
    }
	//método encargado de evitar que se ingresen valores menores a 0, mayores a 9, o no numericos
    eventoCaja() {
        $(".caja").change(e => {//el problema de este es que espera hasta que se abandone la casilla,
            //pero si se hace cambios con el mouse los va a agarrar
            let expresion = /^([1-9])$/;
            let key = e.target.id.slice(5);
            let value = $("#" + e.target.id)[0].value;
            value = expresion.test(value) ? value : "";
            this.modelo.sudoku.casillas[key].valorDigitado = parseInt(value);
            this.modelo.sudoku.casillas[key].seDigito = (value !== "");
            $("#" + e.target.id)[0].value = value;
        });
        $(".caja").keyup(e => {
            let expresion = /^([1-9])$/;
            let key = e.target.id.slice(5);
            let value = $("#" + e.target.id)[0].value;
            value = value.length > 1 ? value.slice(0, 1) : value;
            value = expresion.test(value) ? value : "";
            this.modelo.sudoku.casillas[key].valorDigitado = parseInt(value);
            this.modelo.sudoku.casillas[key].seDigito = (value !== "");
            $("#" + e.target.id)[0].value = value;
        });
    }
	//cambia el estado del checkbox de offline
    clickOffLine() {
        $("#Offline").click();
    }
	//cambia el estado del checkbox de online
    clickOnLine() {
        $("#InLine").click();
    }
	/*
		Cambia el color de una casilla
		Para lo cual usa jquery-ui*
		*animate ya es parte de jquery, pero se requiere ui para modificiar los colores con el animate
	*/
    animarCambioColor(elemento, letra, color) {
        this.animarEnSegundoPlano(
                () => $(`#${elemento}`).animate(
                    {
                        'backgroundColor': color,
                        'color': letra
                    }, 2000
                    , () => $(`#${elemento}`).animate(
                        {
                            'backgroundColor': '#FFF',
                            'color': 'blue'
                        }, 2000
                        )
            )
        );
    }
	///recibe una accion que se ejecutará en segundo plano
    animarEnSegundoPlano(accion) {
        setTimeout(
                () => accion(), 0
                );
    }
	//cambia una casilla a color Verde temporalmente
    marcarOk(id) {
        this.animarCambioColor(id, '#B404AE', '#81F79F');
    }
	//cambia una casilla a color Rojo temporalmente
    marcarError(id) {
        this.animarCambioColor(id, '#4000FF', '#FA5858');
    }
	//cambia una casilla a color Amarillo temporalmente
    marcarPista(id) {
        this.animarCambioColor(id, '#0040FF', '#F4FA58');
    }
	//Despliega un mensaje temporal en la pantalla
    mensaje(txt = "", color = "coral", time = 4500) {
        $("#cuerpoMensaje").html(txt);
        $("#cuerpoMensaje").css("color", color);
        $("#mensaje").show("slow", () => $("#mensaje").fadeOut(time));
    }

}



