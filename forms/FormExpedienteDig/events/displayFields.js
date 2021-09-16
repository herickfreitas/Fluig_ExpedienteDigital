function displayFields(form,customHTML){ 
	
	var activity = getValue('WKNumState');
	var inicioPadrao 		= 0;
	var inicio		 		= 4;
	var etapaGestor	 		= 5;
	var etapaColaborador	= 9;
	var etapaProcessamento	= 28;
	
	log.info("FormExpedienteDig - displayFields - WKNumState "+activity);
	
	if (activity == etapaGestor) {
		
		var habilitar = ""; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();

	    // Laço de repetição para habilitar/desabilitar os campos
	    while (it.hasNext()) { 
	        var key = it.next();
	        if (key == 'gestor' || key == 'colaborador'){
	        	habilitar = true;
	        	form.setEnabled(key, habilitar);
	        	log.info("FormExpedienteDig - displayFields - habilitar - true "+key);
	        	
	        }
	        else {
	        	habilitar = false;
	        	form.setEnabled(key, habilitar);
	        	log.info("FormExpedienteDig - displayFields - habilitar - false "+key);
	        }
	        
	    }
  
	}
	
	else if ((activity == etapaColaborador) || (activity == etapaProcessamento)) {
	    // Ocultando dvGestor na etapa do colaborador ou processamento
		customHTML.append("<script>");
		customHTML.append("$(document).ready(function(){ "); 
		customHTML.append("$('#dvGestor').hide();");
		customHTML.append(" });");
		customHTML.append("</script>");
		
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		var mapaForm = new java.util.HashMap();
		mapaForm = form.getCardData();
		var it = mapaForm.keySet().iterator();
		// Laço de repetição para habilitar/desabilitar os campos
		while (it.hasNext()) {
			var key = it.next();
			form.setEnabled(key, habilitar);
			}
		}
}