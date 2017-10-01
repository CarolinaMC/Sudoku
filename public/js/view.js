class View{
	constructor(){
	}
	
	init(sudoku){
		this.modelo = sudoku;
		if(this.modelo === undefined)
			throw "Sudoku no recuperado correctamente del servidor";
		this.modelo.sudoku.casillas.forEach((casillita,indice)=>{
			let key = `#f${casillita.fila}c${casillita.columna}`;
			$(key).text("");
			
			$(key).append(
				casillita.visible?
				`<div class="elemento">${casillita.valor}</div>`
				:`<input type="number" min="1" max="9" pattern="[1,9]" id="caja_${indice}" class="caja"/>`);
						
		});		
		this.eventoCaja();
	}
	eventoCaja(){
		$(".caja").change(e=>{//el problema de este es que espera hasta que se abandone la casilla,
							 //pero si se hace cambios con el mouse los va a agarrar
			let expresion = /^([1-9])$/
			let key = e.target.id.slice(5);
			let value =  $("#"+e.target.id)[0].value;
			value = expresion.test(value) ? value : "";
			this.modelo.sudoku.casillas[key].valor = value
			$("#"+e.target.id)[0].value = value;
		});
		$(".caja").keyup(e=>{
			let expresion = /^([1-9])$/
			let key = e.target.id.slice(5);
			let value =  $("#"+e.target.id)[0].value;
			value = value.length > 1 ? value.slice(0,1) : value;
			value = expresion.test(value) ? value : "";
			this.modelo.sudoku.casillas[key].valor = value
			$("#"+e.target.id)[0].value = value;
		});
	}

}
