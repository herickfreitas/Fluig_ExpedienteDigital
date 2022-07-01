function validateForm(form){
	
	var activity 			= getValue('WKNumState');
	var nextActivity 		= getValue('WKNextState');
	var inicioPadrao 		= 0;
	var inicio		 		= 4;
	var finalizarExpediente = 11;
	var etapaDestinatario	= 28;
	var etapaGrupo			= 34;
	
	log.info("FormExpedienteDig - validateForm - WKNumState "+activity);
	
	var destinatario = form.getValue('destinatario'); 
	if (destinatario == null){
		destinatario = "";
	}
	log.info("FormExpedienteDig - validateForm - destinatario "+destinatario);
	
	var grupo = form.getValue('grupo'); 
	if (grupo == null ){
		grupo = "";
	}
	log.info("FormExpedienteDig - validateForm - grupo "+grupo); 
	
	var msg = "";
	var hasErros = false;
	
	
	if (activity == inicioPadrao || activity == inicio) {

		if ( destinatario == "" && grupo == "" ){ 
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
		if ( destinatario == "" && grupo == "" ){ 
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