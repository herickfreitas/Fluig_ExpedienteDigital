function displayFields(form,customHTML){ 
	
	var activity = getValue('WKNumState');
	var inicioPadrao 		= 0;
	var inicio		 		= 4;
	var etapaGestor	 		= 5;
	var etapaColaborador	= 9;
	var etapaProcessamento	= 28;
	

	
	
	if (activity == inicioPadrao || activity == inicio ) {
    	// capturar usuario corrente
    	var usuarioCorrente = getDadosUsuario().getLogin();
    	form.setValue("usuarioCorrente",usuarioCorrente);
    	log.info("==========[ displayFields activity ]=========="+activity);
    	log.info("==========[ displayFields usuarioCorrente ]=========="+usuarioCorrente);
	}
	
	else if (activity == etapaProcessamento) {
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

	else {
    	var habilitar = false;
    	form.setEnabled("assunto", habilitar); // desabilitando campo assunto
    	// capturar usuario corrente
    	var usuarioCorrente = getDadosUsuario().getLogin();
    	form.setValue("usuarioCorrente",usuarioCorrente);
    	log.info("==========[ displayFields activity ]=========="+activity);
    	log.info("==========[ displayFields usuarioCorrente ]=========="+usuarioCorrente);
	}
}


function getDadosUsuario(){
    return fluigAPI.getUserService().getCurrent();
}
