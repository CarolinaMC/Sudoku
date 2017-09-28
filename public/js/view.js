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
				:`<div class="elementoNv"> <input id="caja_${indice}" class="caja"/>  </div>`);
						
		});		
		this.eventoCaja();
	}
	eventoCaja(){
		$(".caja").change(e=>{
			let key = e.target.id.slice(5);
			this.modelo.sudoku.casillas[key].valor = $("#"+e.target.id)[0].value;
			//console.log("se cambio el valor a un "+this.modelo.sudoku.casillas[key].valor);
		});
	}

}
