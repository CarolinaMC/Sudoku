/*
 Primer proyecto de paradigmas de programación.
 Sudoku.
 II Ciclo 2017.
 Universidad Nacional de Costa Rica.
 Cynthia Madrigal Quesada 1-1510-0465 Grupo:10:00 a.m. 1-1510-0465 Grupo:10:00 a.m.
 Greivin Rojas Hernadez 4-0211-0725 Grupo:10:00 a.m. 4-0211-0725 Grupo:10:00 a.m.
 Elena Carolina Mora Cordero 1-1553-0351 Grupo:10:00 a.m. 1-1553-0351 Grupo:10:00 a.m.
 Daniel Mora Cordero 1-1473-0950 Grupo:10:00 a.m. 1-1473-0950 Grupo:10:00 a.m.
 #
 #
 #
 */
const mensajeNoPistas = "No más pistas, puede dar click al botón 'Verificar jugadas'";
const mensajeNoGano   = "Lo sentimos, intenta de nuevo, puede utilizar el botón de pistas.";
const mensajeGano     = "GANADOR!!! juega de nuevo aumentando la dificultad o sin pistas.";
const port = 8080;
const api = "api";
const host = "localhost";
const rutaAdd = "game";
const rutaGetById = "sudokus";
const rutaSave = "save";
const facil = 'Facil';
const medio = 'Medio';
const dificil = 'Dificil';
const path_sincronizado = "sudoku_sincronizado";
const path_ganado = "sudoku_ganado";
const path_sudoku = "sudoku_sudoku";
const path_sudoku_id = "sudoku_id";
let accionEnCurso = false;
let control;

