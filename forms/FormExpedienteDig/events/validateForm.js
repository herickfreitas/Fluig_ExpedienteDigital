function validateForm(form){
	
	var activity = getValue('WKNumState');
	var inicioPadrao = 0;
	var inicio		 = 4;
	
	log.info("FormExpedienteDig - validateForm - WKNumState "+activity);
	
	if (activity == inicioPadrao || activity == inicio)  {
		
		var msg = "";
		var hasErros = false;
		
		if (form.getValue('gestor') == "" && form.getValue('zoomColaborador') == ""){
			msg += "Selecione um Gestor ou um Colaborador subordinado.\n";
			var hasErros = true;
			}
		if (form.getValue('gestor') != "" && form.getValue('zoomColaborador') != ""){
			msg += "Selecione um Gestor ou um Colaborador subordinado.\n";
			var hasErros = true;
			}
		if (form.getValue('assunto') == ""){
			msg += "Assunto tem preenchimento obrigatório. \n";
			var hasErros = true;
			}
		if (form.getValue('descricao') == ""){
			msg += "Descrição tem preenchimento obrigatório. \n";
			var hasErros = true;
			}
	}
	if (hasErros == true) {
		throw msg;
		}
	
	
}