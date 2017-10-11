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

const port = 8080;
const api = "api";
const host = "localhost";
const rutaAdd="game";
/*
	se Conecta al servidor para hacer un post, con el cual creará un nuevo sudoku
	el cual será retornado al cliente en formato json
*/
onmessage = evento =>{
	fetch(`http://${host}:${port}/${api}/${rutaAdd}/${evento.data}`,{
			   method: "POST"
			}).then(
				res=>res.status === 500 ? postMessage(res.status)
										: res.json()
			).then(
				res => postMessage(res)
			);
};
