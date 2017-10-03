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
		prepararSudoku(
			e.target.id === 'btnDificil' ? dificil
			: e.target.id === 'btnMedio' ? medio
			: facil
		);
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
      
	$("#buttonGuardar").click(e=>control.guardarSudoku());  
}

const prepararSudoku=(dificultad)=>{
	control.juegoLocal  ? control.sudokuLocal()
				:fetch(`http://${host}:${port}/${api}/${rutaAdd}/${dificultad}`,{
							method: 'POST',
					})
					  .then(res=>res.json())
					  .then(sdk=>{
						control.setSudoku(sdk); 
						control.sincronizado = true;
					  })
					  .catch(ex=>{
						control.sudokuLocal();
					  });

}




