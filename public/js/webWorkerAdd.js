/*
 Primer proyecto de paradigmas de programación.
 Sudoku.
 II Ciclo 2017.
 Universidad Nacional de Costa Rica.
 Cynthia Madrigal Quesada 1-1510-0465 Grupo:10:00 a.m..
 #
 #
 #
 */

/* global fetch */

const port = 8080;
const api = "api";
const host = "localhost";
const rutaAdd="game";
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
