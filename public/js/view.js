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
				:(casillita.seDigito === undefined) ?
					`<input  id="caja_${indice}" class="caja"/>`
					:`<input value="${casillita.valorDigitado}" id="caja_${indice}" class="caja"/>`
						
			);
		});		
		this.eventoCaja();
		$("#divJugar").show();
	}
	eventoCaja(){
		$(".caja").change(e=>{//el problema de este es que espera hasta que se abandone la casilla,
							 //pero si se hace cambios con el mouse los va a agarrar
			let expresion = /^([1-9])$/
			let key = e.target.id.slice(5);
			let value =  $("#"+e.target.id)[0].value;
			value = expresion.test(value) ? value : "";
			this.modelo.sudoku.casillas[key].valorDigitado = parseInt(value);
			this.modelo.sudoku.casillas[key].seDigito = (value !== "");
			$("#"+e.target.id)[0].value = value;
		});
		$(".caja").keyup(e=>{
			let expresion = /^([1-9])$/
			let key = e.target.id.slice(5);
			let value =  $("#"+e.target.id)[0].value;
			value = value.length > 1 ? value.slice(0,1) : value;
			value = expresion.test(value) ? value : "";
			this.modelo.sudoku.casillas[key].valorDigitado = parseInt(value);
			this.modelo.sudoku.casillas[key].seDigito = (value !== "");
			$("#"+e.target.id)[0].value = value;
		});
	}
	clickOffLine(){
		$("#Offline").click();
	}
	clickOnLine(){
		$("#InLine").click();
	}
	marcarOk(id){
		$(`#${id}`).removeClass("cajaError");
		$(`#${id}`).removeClass("cajaPista");
		$(`#${id}`).addClass("cajaOk");
	}
	marcarError(id){
		$(`#${id}`).removeClass("cajaOk");
		$(`#${id}`).removeClass("cajaPista");
		$(`#${id}`).addClass("cajaError");
	}
	marcarPista(id){
		$(`#${id}`).removeClass("cajaError");
		$(`#${id}`).removeClass("cajaOk");
		$(`#${id}`).addClass("cajaPista");
	}
}
