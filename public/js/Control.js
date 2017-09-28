class Control{
	constructor(){
		this.view = new View();
		
	}
	inicializarVariables(){
		this.ajustarLocal(false);
		JSON.parse(sincronizado = localStorage.getItem(path_sincronizado));
		sincronizado = sincronizado || true;
		JSON.parse(juegoGanado  = localStorage.getItem(path_ganado));
		juegoGanado = sincronizado || false;
	}
	guardarVariables(){
		localStorage.setItem(path_sincronizado,sincronizado);
		localStorage.setItem(path_ganado,juegoGanado);
		localStorage.setItem(path_sudoku,this.view.model);
	}
	setSudoku(sudoku){
		this.view.init(sudoku);
	}
	ajustarLocal(estado){
		juegoLocal = estado;
	}
	sudokuLocal(){
		this.ajustarLocal(true);
		sudoku_local = JSON.parse(localStorage(path_sudoku));
		this.setSudoku(sudoku_local);
	}
}