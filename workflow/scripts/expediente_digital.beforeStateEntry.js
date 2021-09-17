var SeqProcessamento = 28;
var SeqColaborador = 9;
var SeqGestor = 5;

function beforeStateEntry(sequenceId){
	
	log.info("beforeStateEntry Expediente Digital - sequenceId:  "+sequenceId);
	
	//If para sequenciar conforme etapas do processo
    if (sequenceId == SeqProcessamento) {
    	ProcessamentoWorkflow();
    }
    else if (sequenceId == SeqColaborador) {
    	ColaboradorWorkflow();
    }
    else if (sequenceId == SeqGestor) {
    	GestorWorkflow();
    }
    
}




function GestorWorkflow() {
	try{
		
	  	//////////////////////////////////////////////////////////////////
	  	//	TRATANDO CAMPOS RELACIONADOS AO GESTOR E GESTOR ANTERIOR  	//
	  	//////////////////////////////////////////////////////////////////		
		
		log.info("==========[ GestorWorkflow - Expediente Digital - ENTROU ]==========");
		
		var gestor 				= hAPI.getCardValue("gestor");
		var gestorAnterior 		= hAPI.getCardValue("gestorAnterior");
		
		log.info("==========[ GestorWorkflow - Expediente Digital - gestor ]=========="+gestor);
		log.info("==========[ GestorWorkflow - Expediente Digital - gestorAnterior ]=========="+gestorAnterior);
		
		//Limpando campo colaborador
		hAPI.setCardValue("colaborador", "");
		
		if (gestor != gestorAnterior) {

			hAPI.setCardValue("gestorAnterior", gestor);
			hAPI.setCardValue("gestor", "");
		}

		else if (gestor == gestorAnterior) {

			hAPI.setCardValue("gestor", "");
		}
		
		
	}
	catch (e)
	{
		log.error(e);
		throw e;
	}
	
}



function ColaboradorWorkflow() {
	try{
		
	  	//////////////////////////////////////////////////////////
	  	//	SE VAZIO, PREENCHENDO gertor COM gestorAnterior  	//
	  	//////////////////////////////////////////////////////////		
		
		log.info("==========[ ColaboradorWorkflow - Expediente Digital - ENTROU ]==========");
		
		var gestor 				= hAPI.getCardValue("gestor");
		var gestorAnterior 		= hAPI.getCardValue("gestorAnterior");
		
		if (gestor == "") {
			hAPI.setCardValue("gestor", gestorAnterior);
		}
		
	}
	catch (e)
	{
		log.error(e);
		throw e;
	}
	
}



function ProcessamentoWorkflow(){
	try {
		
	  	//////////////////////////////////////////////////
	  	//			PREENCHENDO CAMPOS DO FORM.    		//
	  	//////////////////////////////////////////////////
		
		log.info("==========[ ProcessamentoWorkflow - Expediente Digital - ENTROU ]==========");
		
		var processo = getValue("WKNumProces");     			// Recupera o numero da solicitação
		var solicitante = getValue("WKUser");					// Recupera o usuário corrente associado a atividade
		var today = new Date().toISOString().slice(0,10);		// Capturando e formatando data corrente Ex: '2021-09-15'
		
		
		log.info("==========[ ProcessamentoWorkflow - Expediente Digital - today ]========== " + today);
		log.info("==========[ ProcessamentoWorkflow - Expediente Digital - identificadorFluig ]========== " + processo);
		log.info("==========[ ProcessamentoWorkflow - Expediente Digital - solicitante ]========== " + solicitante);
		hAPI.setCardValue("dataSolicitacao", today);
		hAPI.setCardValue("identificadorFluig", processo);
		hAPI.setCardValue("solicitante", solicitante);
		hAPI.setCardValue("gestorAnterior", solicitante);
		}
	
	catch (e)
	{
		log.error(e);
		throw e;
	}
}