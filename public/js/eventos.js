const cierre=()=>{
	control.guardarSudoku();
}
const initEventos=()=>{
   control = new Control();

   
   $(".btnDificultad").click(e=>{
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
   
   $("#buttonPista").click(e=>control.pedirPista());
   
   $("#opcReglas").click(e=>{
        $("#divJugar").hide();
        $("#divReglas").show();
        $("#divOpciones").hide();
        $("#divAboutus").hide();
   })
   $("#opcAboutus").click(e=>{
        $("#divJugar").hide();
        $("#divReglas").hide();
        $("#divOpciones").hide();
        $("#divAboutus").show();
   })
   $("#opcOpciones").click(e=>{
        $("#divJugar").hide();
        $("#divReglas").hide();
        $("#divOpciones").show();
        $("#divAboutus").hide();
   })
   $("#btn_sudoku").click(e=>  $("#header").is(":visible") ?
							    (	$("#header").slideUp( 300 ).delay( 800 ),
									$("#flechita").removeClass("glyphicon-chevron-up"),
									$("#flechita").addClass("glyphicon-chevron-down")
								)
							   :(	$("#header").slideDown(300 ).delay( 800 ).fadeIn(),
									$("#flechita").removeClass("glyphicon-chevron-down"),
									$("#flechita").addClass("glyphicon-chevron-up")
								)
								 
					     );
	$(".radioEstado").change(e=>control.ajustarLocal(e.target.checked));					 
      
	$("#buttonGuardar").click(e=>{
		accionEnCurso ? 0
		:(
			accionEnCurso = true,
			control.guardarSudoku()
		)
	});  
	
	$("#buttonVerificar").click(e=>control.verificarJugadas());
	
	$("#buttonReset").click(e=>control.resetear());
	
	$("#buttonSolucion").click(e=>control.mostrarSolucion());
	
	$("#buttonTerminar").click(e=>control.eventoGano());
}





