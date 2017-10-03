class Util{
	/**
		@param min numero minimo que se desea obtener en el random
		@param max numero maximo que se desea obtener en el random
		Genera un número random entre <<min>> y <<max>>
	*/
	static rand(min,max){
		return parseInt(Math.random() * (max - min) + min);
	}
}
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
	pedirPista(){
		/*recupera todos los elementos que no son visibles
		  y que se les ha ingresado un valor, y dicho valor no es correcto
		*/
		let opciones = this.view
						   .modelo
						   .sudoku
						   .casillas
						   .filter(e=>!e.visible  && e.valor != e.valorDigitado);
		opciones.length === 0 ? alert("agregar un mensaje bonito de que no hay pistas")
							  : this.seleccionarPista(opciones);
	}
	seleccionarPista(opciones){
		let dato = opciones[ Util.rand(0,opciones.length-1)];
		dato.seDigito = true;
		dato.valorDigitado = dato.valor;
		let key =  `f${dato.fila}c${dato.columna}`;
		let caja = $(`#${key} > :input`)[0];
		caja.value = dato.valor;
		this.view.marcarPista(caja.id);
	}
}




