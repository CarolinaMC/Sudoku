....
/**
La idea es crear un Generador y un Sudoku
-El generador además de crear los numeros para el sudoku
va servir para verificar luego las respuestas
-El Sudoku va servir como un modelo para enviarselo al cliente
ya con celdas ocultas y todo.

El generador tiene que guardarse para luego poder verificar 
las respuestas.
El Sudoku tiene que guardarse al inicio para tener el estado inicial
y tiene que estarse reemplazando cada vez que el cliente
guarda los cambios, la idea es que el cliente envié su copia del sudoku
con valores ingresados (que sería la versión actualizada)
y caerle encima a la versión desactualizada)

La ip y el id van a ser como la llave primaria del Sudoku.
si un cliente se conecta, se debería verificar primero si no 
hay un juego activo con esa ip, si lo hay se le busca y se le envía

El id podría guardarse en el localStorage del cliente
para que cuando quiera recuperar un juego, se envie en el body del request
y se haga la consulta a la base de datos para que extraiga el sudoku 
y el generador con esa ip y esa id

Si el cliente se borra o se rinde, borrar esa combinación de ip y id 
de la base de datos.

*/


router.route("/sudoku")
.post(
	(req,res)=>{
		
		/**verificar si no tiene un juego activo
			si lo tiene se recupera y se le envía el objeto sudoku
			sino todo lo que sigue..
		*/
		///se obtiene la dificultad del cliente
		let dificultad = req.body.dificultad;
		/**obtener la ip del request*/
		///se crea el generador del sudoku
		let generador = new Generador();
		/// se crea el sudoku
		let sudoku = new Sudoku(generador,dificultad);
		/**
		* generador.ip = ip recuperada del request //la ip para poder manejar varios juegos a la vez
		* sudoku.ip    = ip recuperada del request
		* let id = new Date().getTime();//forma facil de poner un id -> no se repiten
		* generador.id = id;
		* sudoku.id = id;
		* guardar el sudoku y el generador en la base de datos
		* y enviar el sudoku en el response
		* 
		* no se obtiene dimension y todos esos parametros del request
		* xq el generador y el sudoku tienen que crearse
		* del lado del server web, no del lado del cliente.
		* El generador va servir para tener almacenada las respuestas
		* El sudoku para mantener guardado el avance del cliente
		* cada vez que el jugador le de guardar cambios, verificar
		* o perdir pista (luego se ve en que casos concretos)
		* se envía el Sudoku que el cliente tiene
		* para remplazarlo en la base e ir guardando los cambios
		*/
		
		
	}
);