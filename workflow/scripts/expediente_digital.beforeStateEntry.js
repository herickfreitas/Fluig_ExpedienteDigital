var SeqProcessamento = 28;
var SeqColaborador = 9;
var SeqGestor = 5;
var SeqGateway = 22;
var SeqFinalizar = 11;


function beforeStateEntry(sequenceId){
	
	log.info("beforeStateEntry Expediente Digital - sequenceId:  "+sequenceId);
	
	//If para sequenciar conforme etapas do processo
    if (sequenceId == SeqProcessamento) {
    	ProcessamentoWorkflow();
    }
    else if (sequenceId == SeqGateway || sequenceId == SeqFinalizar) {
    	ComplementoHistorico();
    }
    else if (sequenceId == SeqColaborador) {
    	ColaboradorWorkflow();
    }
    else if (sequenceId == SeqGestor) {
    	GestorWorkflow();
    }
    
}



//////////////////////////////////////////
//FUNCAO PARA FORMATAR DATA E HORA  	//
//////////////////////////////////////////

function dataAtualFormatada(){
var hoje = new Date();
var dd = hoje.getDate();
var mm = hoje.getMonth()+1;
var aaaa = hoje.getFullYear();
var horas = hoje.getHours();
var minutos = hoje.getMinutes();
var segundos = hoje.getSeconds();
if(dd<10){dd='0'+dd}
if(mm<10){mm='0'+mm}
if(horas<10){horas='0'+horas}
if(minutos<10){minutos='0'+minutos}
if(segundos<10){segundos='0'+segundos}
return dd +'/'+ mm +'/'+ aaaa +' - '+ horas +':'+ minutos;
}	


//////////////////////////////////////////////////////
//FUNCAO RETORNA O NOME COMPLETO CONFORME LOGIN 	//
//////////////////////////////////////////////////////

function nomeCompleto(login){
var usuario = login;
var datasetRetorno = DatasetFactory.getDataset("colleague", null, null, null); // Buscando Gestor de acordo com o colaborador
for (var i = 0; i < datasetRetorno.rowsCount; i++) {
var usuario_fluig = datasetRetorno.getValue(i, "login"); 
if (usuario_fluig == usuario){
var name_fluig = (datasetRetorno.getValue(i, "colleagueName")).toUpperCase(); 
}
}
return name_fluig;
}	




function ComplementoHistorico() {
	try{
		
		//////////////////////////////////////////////////////////////////////////
        //		MOVIMENTANDO CONTEÚDO DE DESPACHO PARA DESPACHO HISTORICO		//
		//////////////////////////////////////////////////////////////////////////	
		var userLogado = getValue("WKUser");					// Recupera o usuário corrente associado a atividade
		var despacho 		= hAPI.getCardValue("despacho");
		
		if (despacho != ""){
			
			var nome_Completo 		= nomeCompleto(userLogado);
			var quebraLinha			= "\n \n ********************************************************************************************************************************************************************************** \n \n ";
			var historicoDespacho 	= hAPI.getCardValue("historicoDespacho");
			// Formatando
			var dataFormatada = dataAtualFormatada(); 
			var concatenando = 'Colaborador(a): '+nome_Completo+' \n Data: '+dataFormatada+' \n Despacho: '+despacho;
			log.info("==========[ ProcessamentoWorkflow - Expediente Digital - historicoDespacho - ColaboradorWorkflow - concatenando ]========== "+concatenando);
			hAPI.setCardValue("historicoDespacho", concatenando + quebraLinha + historicoDespacho);
			
			// Esvaziando campo despacho
			hAPI.setCardValue("despacho", "");
		}
		
	}
	catch (e)
	{
		log.error(e);
		throw e;
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
		
		//Limpando campo colaborador
		hAPI.setCardValue("colaborador", "");
		
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
		var gestorLogado = hAPI.getCardValue("gestorLogado");	// true é um gestor logado, false não é um, gestor logado
		var nome_Completo = nomeCompleto(solicitante);			// Função retorna o nome completo cadastrado no Fluig
		
		
		log.info("==========[ ProcessamentoWorkflow - Expediente Digital - today ]========== " + today);
		log.info("==========[ ProcessamentoWorkflow - Expediente Digital - identificadorFluig ]========== " + processo);
		log.info("==========[ ProcessamentoWorkflow - Expediente Digital - solicitante ]========== " + solicitante);
		log.info("==========[ ProcessamentoWorkflow - Expediente Digital - gestorLogado ]========== " + gestorLogado);
		hAPI.setCardValue("dataSolicitacao", today);
		hAPI.setCardValue("identificadorFluig", processo);
		hAPI.setCardValue("solicitante", solicitante);
		
        //////////////////////////////////////////////////////////////////////////
        //		MOVIMENTANDO CONTEÚDO DE DESPACHO PARA DESPACHO HISTORICO		//
		//////////////////////////////////////////////////////////////////////////		
		
		var despacho = hAPI.getCardValue("despacho");
		// Formatando
		var dataFormatada = dataAtualFormatada(); 
		var concatenando = 'Solicitante: '+nome_Completo+' \n Data: '+dataFormatada+' \n Despacho: '+despacho;
		log.info("==========[ ProcessamentoWorkflow - Expediente Digital - historicoDespacho - concatenando ]========== "+concatenando);
		hAPI.setCardValue("historicoDespacho", concatenando);
		// Esvaziando campo despacho
		hAPI.setCardValue("despacho", "");
		
		
        //////////////////////////////////////////////////////////
        //		QUANDO FOR UM GESTOR QUE INICIOU O PROCESSO		//
        //////////////////////////////////////////////////////////
		
		if (gestorLogado == "true") {
			log.info("==========[ ProcessamentoWorkflow - Expediente Digital - IF-ENTROU (gestorLogado == true) ]========== ");
			hAPI.setCardValue("gestorAnterior", solicitante);
			}
		
		
        //////////////////////////////////////////////////////////
        //	QUANDO FOR UM COLABORADOR QUE INICIOU O PROCESSO	//
        //////////////////////////////////////////////////////////		
		
		else if (gestorLogado == "false") {
			log.info("==========[ ProcessamentoWorkflow - Expediente Digital - IF-ENTROU (gestorLogado == false) ]========== ");
			var c1 = DatasetFactory.createConstraint("CODUSUARIO", solicitante, solicitante, ConstraintType.MUST);
			var constraints = new Array(c1);
			log.info("==========[ ProcessamentoWorkflow - Expediente Digital - constraints ]========== "+constraints);
			var datasetRetorno = DatasetFactory.getDataset("_RM_FUNC_FILIAL_CUSTO", null, constraints, null); // Buscando Gestor de acordo com o colaborador
	        
			for (var i = 0; i < datasetRetorno.rowsCount; i++) {
	        	var codUsuarioChefe = datasetRetorno.getValue(i, "CODUSUARIO_CHEFE"); 
	        	log.info("==========[ ProcessamentoWorkflow - Expediente Digital - codUsuarioChefe ]========== "+codUsuarioChefe);
	        	hAPI.setCardValue("gestor", codUsuarioChefe);
				}
			}
		}
	
	catch (e)
	{
		log.error(e);
		throw e;
	}


}