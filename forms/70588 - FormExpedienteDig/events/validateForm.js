function validateForm(form){
	
	var activity 			= getValue('WKNumState');
	var nextActivity 		= getValue('WKNextState');
	var inicioPadrao 		= 0;
	var inicio		 		= 4;
	var etapaProcessamento	= 28;
	var etapaGestor	 		= 5;
	var etapaColaborador	= 9;
	var etapaGateway		= 22;
	
	
	log.info("FormExpedienteDig - validateForm - WKNumState "+activity);
	
	
	var msg = "";
	var hasErros = false;
	var gestorLogado = form.getValue('gestorLogado'); // true é um gestor logado, false não é um, gestor logado - ATENÇÃO O CAMPO É TEXTO
	
	
	if ( nextActivity == etapaGateway){ 
		
		log.info("FormExpedienteDig - validateForm - nextActivity entrou!! ");
		
		if (form.getValue('gestor') == "" && form.getValue('colaborador') == ""){
			msg += "Selecione um Gestor/Acessor ou um Empregado.\n";
			var hasErros = true;
			}
		if (form.getValue('gestor') != "" && form.getValue('colaborador') != ""){
			msg += "Selecione um Gestor/Acessor ou um Empregado.\n";
			var hasErros = true;
			}
	}
	
	
	if (activity == inicioPadrao || activity == inicio) {

		if (form.getValue('gestor') == "" && form.getValue('colaborador') == ""){
			msg += "Selecione um Gestor/Acessor ou um Empregado.\n";
			var hasErros = true;
			}
		if (form.getValue('gestor') != "" && form.getValue('colaborador') != ""){
			msg += "Selecione um Gestor/Acessor ou um Empregado.\n";
			var hasErros = true;
			}
		if (form.getValue('assunto') == ""){
			msg += "Assunto tem preenchimento obrigatório. \n";
			var hasErros = true;
			}
		if (form.getValue('despacho') == ""){
			msg += "Despacho tem preenchimento obrigatório. \n";
			var hasErros = true;
			}
	}
	
	else if (activity == etapaGestor) {

		if (form.getValue('despacho') == ""){
			msg += "Despacho tem preenchimento obrigatório. \n";
			var hasErros = true;
			}
	}
	
	else if (activity == etapaColaborador) {
		
		if (form.getValue('despacho') == ""){
			msg += "Despacho tem preenchimento obrigatório. \n";
			var hasErros = true;
			}
	}
	
	if (hasErros == true) {
		throw msg;
		}
	
}