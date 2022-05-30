function validateForm(form){
	
	var activity 			= getValue('WKNumState');
	var nextActivity 		= getValue('WKNextState');
	var inicioPadrao 		= 0;
	var inicio		 		= 4;
	var finalizarExpediente = 11;
	var etapaDestinatario	= 28;
	var etapaGrupo			= 34;
	
	log.info("FormExpedienteDig - validateForm - WKNumState "+activity);
	
	
	var msg = "";
	var hasErros = false;
	
	
	if (activity == inicioPadrao || activity == inicio) {

		if (form.getValue('destinatario') == "" && form.getValue('grupo') == ""){
			msg += "Selecione um destinatário ou um grupo.\n";
			var hasErros = true;
			}
		if (form.getValue('destinatario') != "" && form.getValue('grupo') != ""){
			msg += "Selecione um destinatário ou um grupo.\n";
			var hasErros = true;
			}
		if (form.getValue('assunto') == ""){
			msg += "Assunto tem preenchimento obrigatório. \n";
			var hasErros = true;
			}
		if (form.getValue('categoria') == ""){
			msg += "Categoria tem preenchimento obrigatório. \n";
			var hasErros = true;
			}
		if (form.getValue('despacho') == ""){
			msg += "Despacho tem preenchimento obrigatório. \n";
			var hasErros = true;
			}
	}
	else if (nextActivity == finalizarExpediente){
		if (form.getValue('despacho') == ""){
			msg += "Despacho tem preenchimento obrigatório. \n";
			var hasErros = true;
			}
	}
	
	else if (activity == etapaGrupo || activity == etapaDestinatario){
		if (form.getValue('destinatario') == "" && form.getValue('grupo') == ""){
			msg += "Selecione um destinatário ou um grupo.\n";
			var hasErros = true;
			}
		if (form.getValue('destinatario') != "" && form.getValue('grupo') != ""){
			msg += "Selecione um destinatário ou um grupo.\n";
			var hasErros = true;
			}
		if (form.getValue('despacho') == ""){
			msg += "Despacho tem preenchimento obrigatório. \n";
			var hasErros = true;
			}
	}
	
	
	if (hasErros == true) {
		throw msg;
		}
	
}