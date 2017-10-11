/*
 Primer proyecto de paradigmas de programación.
 Sudoku.
 II Ciclo 2017.
 Universidad Nacional de Costa Rica.
 Cynthia Madrigal Quesada 1-1510-0465 Grupo:10:00 a.m..
 Greivin Rojas Hernadez 4-0211-0725 Grupo:10:00 a.m. 4-0211-0725 Grupo:10:00 a.m.
 Elena Carolina Mora Cordero 1-1553-0351 Grupo:10:00 a.m. 1-1553-0351 Grupo:10:00 a.m.
 Daniel Mora Cordero 1-1473-0950 Grupo:10:00 a.m. 1-1473-0950 Grupo:10:00 a.m.
 #
 #
 #
 */

/* global fetch */

/*
	Envia al sudoku en formato json al servidor, por medio de una petición PUT
	para que los cambios sean almacenados en la base de datos
*/
const port = 8080;
const api = "api";
const host = "localhost";
const rutaSave="save";
onmessage = evento =>{
	fetch(`http://${host}:${port}/${api}/${rutaSave}/${evento.data}`,{
			   method: "PUT"
			}).then(res=>postMessage(res.status));
};
