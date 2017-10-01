class Control{
	constructor(){
		this.view = new View();
		this.verificarExisteSudoku();
	}
	inicializarVariables(){
		this.ajustarLocal(false);
		this.sincronizado = JSON.parse(localStorage.getItem(path_sincronizado));
		this.sincronizado = this.sincronizado || true;
		this.juegoGanado  = JSON.parse(localStorage.getItem(path_ganado));
		this.juegoGanado = this.sincronizado || false;
	}
	
	verificarExisteSudoku(){
		this.inicializarVariables();
		!this.sincronizado ? 
			this.guardarSudoku()/*para que se sincronice*/
		  : this.sudokuDB();
		
	}
	
	guardarSudoku(){
		/*se intenta conectar y guardar, si se guarda, se pasa la sincronizado a true y se limpiar el localStorage
		sino, se mantiene el sudoku en el localStorage
		**/
		alert("falta arreglar el update");
	}
	
	guardarVariables(){
		localStorage.setItem(path_sincronizado,this.sincronizado);
		localStorage.setItem(path_ganado,this.juegoGanado);
		localStorage.setItem(path_sudoku,JSON.stringify(this.view.modelo.sudoku));
	}
	setSudoku(sudoku){
		this.view.init(sudoku);
		localStorage.setItem(path_sudoku_id,this.view.modelo.sudoku._id	);
		this.guardarVariables();
	}
	ajustarLocal(estado){
		this.juegoLocal = estado;
	}
	sudokuLocal(){
		$("#Offline").attr('checked', true)
		let sudoku_local = JSON.parse(localStorage.getItem(path_sudoku));
		this.setSudoku(sudoku_local);
	}
	limpiarLocalStorage(){
		localStorage.removeItem(path_sincronizado);
		localStorage.removeItem(path_ganado);
		localStorage.removeItem(path_sudoku);
		localStorage.removeItem(path_sudoku_id);
	}
	sudokuDB(){
		let id 	= localStorage.getItem(path_sudoku_id);
		id === undefined ? limpiarLocalStorage()
						 : this.getSudoku(id);
		
	}
	getSudoku(id){
		fetch(`http://${host}:${port}/${api}/${rutaGetById}/${id}`,{
					method: 'GET',
			})
			  .then(res=>res.json())
			  .then(sdk=>{
				$("#divJugar").show()
				control.setSudoku(sdk); 
			  })
			  .catch(ex=>{
				control.sudokuLocal();
			  });
	}
}