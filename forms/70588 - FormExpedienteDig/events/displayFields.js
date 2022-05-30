function displayFields(form,customHTML){ 
	
	var activity = getValue('WKNumState');
	var inicioPadrao 			= 0;
	var inicio		 			= 4;
	var encaminharExpediente	= 30;
	var destinatario			= 28;
	var finalizarExpediente		= 11;
	var grupo					= 34;
	var leitor					= 37;
	

	
	
	if (activity == inicioPadrao || activity == inicio ) {
    	// capturar usuario corrente
    	var usuarioCorrente = getDadosUsuario().getLogin();
    	form.setValue("usuarioCorrente",usuarioCorrente);
    	form.setValue("solicitante",usuarioCorrente);
    	log.info("==========[ displayFields activity ]=========="+activity);
    	log.info("==========[ displayFields usuarioCorrente ]=========="+usuarioCorrente);
		// desabilitando campos     	
    	var habilitar = false; //habilitar = true;
    	form.setEnabled("historicoDespacho", habilitar); 
	
	}
	
	
	else if (activity == encaminharExpediente || activity == leitor) {
		// Desabilitando tudo
	    var habilitar = false; 
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar todos os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
		
	}
	
	 
	else if (activity == destinatario) {
		// desabilitando campos     	//habilitar = true;
    	var habilitar = false;
    	form.setEnabled("leitoresCopia", habilitar);
    	form.setEnabled("assunto", habilitar); 
    	form.setEnabled("categoria", habilitar);
    	form.setEnabled("fornecedor", habilitar); 
    	
    	// ocultando fornecedor quando vazio
		var fornecedor = form.getValue("fornecedor");
		if (fornecedor == '') {
			customHTML.append("<script>");
			customHTML.append("$(document).ready(function(){ ");
			customHTML.append("$('#dvfornecedor').hide();");
			customHTML.append(" });");
			customHTML.append("</script>");
		}
	}
	
	else if (activity == grupo) {
		// desabilitando campos     	//habilitar = true;
    	var habilitar = false;
    	form.setEnabled("leitoresCopia", habilitar);
    	form.setEnabled("assunto", habilitar); 
    	form.setEnabled("categoria", habilitar);
    	form.setEnabled("fornecedor", habilitar); 
    	
    	// ocultando fornecedor quando vazio
		var fornecedor = form.getValue("fornecedor");
		if (fornecedor == '') {
			customHTML.append("<script>");
			customHTML.append("$(document).ready(function(){ ");
			customHTML.append("$('#dvfornecedor').hide();");
			customHTML.append(" });");
			customHTML.append("</script>");
		}
	}
	
	else if (activity == finalizarExpediente) {
		//Ocultando informações quando o processo finalizar.
		customHTML.append("<script>");
		customHTML.append("$(document).ready(function(){ ");
		customHTML.append("$('#dvdestino').hide();");
		customHTML.append("$('#dvleitores').hide();");
		customHTML.append("$('#dvleitoresCopia').hide();");
		customHTML.append("$('#dvdespacho').hide();");
		// verificando campo forncedor
		var fornecedor = form.getValue("fornecedor");
		if (fornecedor == '') {
			customHTML.append("$('#dvfornecedor').hide();");
		}
		customHTML.append(" });");
		customHTML.append("</script>");
	}
	
	else {
		// desabilitando campos     	//habilitar = true;
    	var habilitar = false;
    	form.setEnabled("leitoresCopia", habilitar);
    	form.setEnabled("assunto", habilitar); 
    	form.setEnabled("categoria", habilitar);
    	form.setEnabled("fornecedor", habilitar); 
	}
}


function getDadosUsuario(){
    return fluigAPI.getUserService().getCurrent();
}
