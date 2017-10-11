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

/* global control, dificil, medio, facil */

const cierre = () => {
    control.guardarSudoku();
};
const initEventos = () => {
    control = new Control();


    $(".btnDificultad").click(e => {
		$("#tablero").hide();
        $("#divJugar").show();
        $("#divReglas").hide();
        $("#divOpciones").hide();
        $("#divAboutus").hide();
        control.prepararSudoku(
                e.target.id === 'btnDificil' ? dificil
                : e.target.id === 'btnMedio' ? medio
                : facil
                );
        $("#panelBotones").fadeIn();
        $("#jugarOtraVez").addClass("hide");
        $("#btnModalCancelar").click();
    });

    $("#opcJugar").click(e => {
        control.view.modelo ?
                ($("#divJugar").show(),
                        $("#divReglas").hide(),
                        $("#divAboutus").hide())
                : $("#myModal").modal("show");
    });

    $("#buttonPista").click(e => control.pedirPista());

    $("#opcReglas").click(e => {
        $("#divJugar").hide();
        $("#divReglas").show();
        $("#divAboutus").hide();
    })
    $("#opcAboutus").click(e => {
        $("#divJugar").hide();
        $("#divReglas").hide();
        $("#divAboutus").show();
    })
    $("#opcOpciones").click(e => {
        $("#divJugar").hide();
        $("#divReglas").hide();
        $("#divAboutus").hide();
    })
    $("#btn_sudoku").click(e => $("#header").is(":visible") ?
                ($("#header").slideUp(300).delay(800),
                        $("#flechita").removeClass("glyphicon-chevron-up"),
                        $("#flechita").addClass("glyphicon-chevron-down")
                        )
                : ($("#header").slideDown(300).delay(800).fadeIn(),
                        $("#flechita").removeClass("glyphicon-chevron-down"),
                        $("#flechita").addClass("glyphicon-chevron-up")
                        )

    );
    $(".radioEstado").change(e => control.ajustarLocal(e.target.checked));

    $("#buttonGuardar").click(e => {
        accionEnCurso ? 0
                : (
                        accionEnCurso = true,
                        control.guardarSudoku()
                        )
    });

    $("#buttonVerificar").click(e => control.verificarJugadas());

    $("#buttonReset").click(e => control.resetear());

    $("#buttonSolucion").click(e => control.mostrarSolucion());

    $("#buttonTerminar").click(e => control.eventoGano());
}





