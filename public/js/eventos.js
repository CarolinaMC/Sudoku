var a;
const initEventos=()=>{
    $("#opcJugar").click(e=>{
       /* $("#divJugar").show();
        $("#divReglas").hide();
        $("#divOpciones").hide();
        $("#divAboutus").hide();
		//prepararSudoku();*/
   })
   
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
      
}

const prepararSudoku=(dificultad)=>{
	fetch(`http://${host}:${port}/${api}/${rutaAdd}/${dificultad}`,{
				method: 'POST',
		})
		  .then(res=>res.json())
		  .then(sdk=>{
			view.init(sdk);  
		  })
	
}




