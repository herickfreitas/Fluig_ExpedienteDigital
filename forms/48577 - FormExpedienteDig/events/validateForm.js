function validateForm(form){
	
	var activity = getValue('WKNumState');
	var inicioPadrao 		= 0;
	var inicio		 		= 4;
	var etapaProcessamento	= 28;
	var etapaGestor	 		= 5;
	var etapaColaborador	= 9;
	
	
	log.info("FormExpedienteDig - validateForm - WKNumState "+activity);
	
	
	var msg = "";
	var hasErros = false;
	var gestorLogado = form.getValue('gestorLogado'); // true é um gestor logado, false não é um, gestor logado - ATENÇÃO O CAMPO É TEXTO
	
	
	if ((activity == inicioPadrao || activity == inicio) && gestorLogado == "true") {

		if (form.getValue('gestor') == "" && form.getValue('colaborador') == ""){
			msg += "Selecione um Gestor ou um Colaborador subordinado.\n";
			var hasErros = true;
			}
		if (form.getValue('gestor') != "" && form.getValue('colaborador') != ""){
			msg += "Selecione um Gestor ou um Colaborador subordinado.\n";
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
	
	else if ((activity == inicioPadrao || activity == inicio) && gestorLogado == "false") {
		
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