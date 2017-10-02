class Control{
	constructor(){
		this.view = new View();
		let id = localStorage.getItem(path_sudoku_id);
		id ? this.verificarExisteSudoku()
		   :0;
	}
	inicializarVariables(){
		this.ajustarLocal(false);
		this.sincronizado = localStorage.getItem(path_sincronizado);
		this.sincronizado = this.sincronizado == "undefined" ? true
								:JSON.parse(localStorage.getItem(path_sincronizado));
		this.juegoGanado = localStorage.getItem(path_ganado);
		this.juegoGanado = this.juegoGanado == "undefined" ? true
								:JSON.parse(localStorage.getItem(path_ganado));						
	}
	
	verificarExisteSudoku(){
		this.inicializarVariables();
		!this.sincronizado ? 
			this.cargarYSincronizar()/*para que se sincronice*/
		  : this.sudokuDB();
		
	}
	
	cargarYSincronizar(){
		this.sudokuLocal();
		this.guardarSudoku();		
	}
	
	guardarSudoku(){
		let jsonSudoku = JSON.stringify(this.view.modelo.sudoku);
		fetch(`http://${host}:${port}/${api}/${rutaSave}/${jsonSudoku}`,{
			   method: "PUT",
			}).then(res=>{
				this.sincronizado = res.status === 200;
				this.sincronizado ? this.view.clickOnLine()
								  : this.view.clickOffLine();
				this.guardarVariables();
			});
		
		/*se intenta conectar y guardar, si se guarda, se pasa la sincronizado a true y se limpiar el localStorage
		sino, se mantiene el sudoku en el localStorage
		**/
	}
	
	guardarVariables(){
		localStorage.setItem(path_sincronizado,this.sincronizado);
		localStorage.setItem(path_ganado,this.juegoGanado);
		localStorage.setItem(path_sudoku_id,this.view.modelo.sudoku._id);
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
		this.sincronizado =  false;
		this.view.clickOffLine();
		let sudoku_local = JSON.parse(localStorage.getItem(path_sudoku));
		this.setSudoku({sudoku:sudoku_local});
	}
	limpiarLocalStorage(){
		localStorage.removeItem(path_sincronizado);
		localStorage.removeItem(path_ganado);
		localStorage.removeItem(path_sudoku);
		localStorage.removeItem(path_sudoku_id);
	}
	sudokuDB(){
		let id 	= localStorage.getItem(path_sudoku_id);
		!this.ganado && id !== undefined  ? this.getSudoku(id)
										  : this.limpiarLocalStorage();
										 
						 
	}
	getSudoku(id){
		fetch(`http://${host}:${port}/${api}/${rutaGetById}/${id}`,{
					method: 'GET',
			})
			  .then(res=>res.json())
			  .then(sdk=>{
				this.setSudoku(sdk); 
				this.view.clickOnLine();
				this.sincronizado = true;
			  })
			  .catch(ex=>{
				this.view.clickOffLine();
				this.sudokuLocal();
			  });
	}
}