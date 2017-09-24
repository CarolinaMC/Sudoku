class View{
	constructor(){
	}
	
	init(sudoku){
		this.modelo = sudoku;
		if(this.modelo === undefined)
			throw "Sudoku no recuperado correctamente del servidor";
		this.modelo.sudoku.casillas.forEach(casillita=>{
			let key = `#f${casillita.fila}c${casillita.columna}`;
			$(key).text("");
			
			$(key).append(
				casillita.visible?
				`<div class="elemento">${casillita.valor}</div>`
				:`<div class="elementoNv"> <input class="caja"/>  </div>`);
				
		});
		//this.novisibles();
	}
	/*
	novisibles(){
		$(".elementoNV").focus(ev=>{
			$(`#C${ev.target.id}`).show();

		});
		
	}*/
}
