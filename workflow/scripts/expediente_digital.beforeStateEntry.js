var SeqDestinatario 		= 28;
var EncaminharExpediente 	= 30;
var SeqFinalizar 			= 11;
var SeqGrupo	 			= 34;
var SeqLeitor	 			= 37;


function beforeStateEntry(sequenceId){
	
	//If para sequenciar conforme etapas do processo
    if (sequenceId == SeqDestinatario) {
    	ativDestinatario();
    }
    else if (sequenceId == SeqGrupo) {
    	ativGrupo();
    }
    else if (sequenceId == SeqLeitor) {
    	ativLeitor();
    }
	else if (sequenceId == EncaminharExpediente) {
    	ComplementoHistorico();
    	ativEncaminhar();
    	ordernarLeitoresCopia();
    }
	else if (sequenceId == SeqFinalizar) {
    	ComplementoHistorico();
    }
}

function ativEncaminhar() {
	// Tratamento dos leitores
	var leitores 	 = hAPI.getCardValue("leitores");
	log.info("==========[ beforeStateEntry - ativEncaminhar - leitores ]========== " + leitores);
	
	
	if ( leitores != '') {
		
		// Tratando campo zoom com caracter especial 
		// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp
		leitoresString = String(leitores);
	    var rege = new RegExp("[\u0018]", "g"); 
	    var leitoresNovo = leitoresString.replace(rege, " , ");
	    log.info("leitoresNovo: "  + leitoresNovo);
		
	    // Criando um objeto com leitores coletados
	    var arrayLeitores = [];
	    arrayLeitores = leitoresNovo.split(' , ');
	    
		// Capturando primeiro leitor
		var leitor = arrayLeitores[0];
		log.info("==========[ beforeStateEntry - ativEncaminhar - arrayLeitores[0] ]========== " + leitor);
		hAPI.setCardValue("leitor",leitor);
		
		// Atualizando campo de leitores sem o primeiro leitor, ou vazio quando não houverem mais
		var qtd_arrayLeitores = arrayLeitores.length;
		log.info("==========[ beforeStateEntry - ativEncaminhar - qtd_arrayLeitores ]========== " + qtd_arrayLeitores);
		
		var arrayLeitoresTemp = [];
		if (qtd_arrayLeitores > 1 ) { // Quando há mais de um usuário em cópia
			for (var i = 1; i < qtd_arrayLeitores; i++ ) {
				arrayLeitoresTemp.push(arrayLeitores[i]);
			}
			log.info("==========[ beforeStateEntry - ativEncaminhar - arrayLeitoresTemp ]========== " + arrayLeitoresTemp);
			hAPI.setCardValue("leitores",arrayLeitoresTemp);
		}
		else { // Quando há somente um usuário em cópia
			hAPI.setCardValue("leitores",'');
		}
		
	}
	else {
		// Formatando campo grupo para atribuição - SÓ IRÁ TRATAR O CAMPO QUANDO LEITORES ESTIVER VAZIO
		var grupo   = hAPI.getCardValue("grupo");
		log.info("==========[ beforeStateEntry - ativEncaminhar - grupo ]========== " + grupo);
		if (grupo != '') {
			var grupoTemp = "Pool:Group:"+grupo;
			log.info("==========[ beforeStateEntry - ativEncaminhar - grupoTemp ]========== " + grupoTemp);
			hAPI.setCardValue("grupo", grupoTemp);
		}
	}

}

function ativGrupo() {
	// Grupo atual
	var grupoAtual 	 = hAPI.getCardValue("grupo");
	log.info("==========[ beforeStateEntry - ativGrupo - grupoAtual ]========== " + grupoAtual);
	
	// Esvaziando campo destinatario
	hAPI.setCardValue("grupo", "");
}


function ativDestinatario() {
	// Esvaziando campo destinatario
	hAPI.setCardValue("destinatario", "");
}


function ativLeitor() {
	
	// Gravando leitores em cópia
	var leitorAtual 	 = hAPI.getCardValue("leitor");
	var leitoresCopia 	 = hAPI.getCardValue("leitoresCopia");
	
	if ( leitoresCopia == '' ) {
		hAPI.setCardValue("leitoresCopia", leitorAtual);
	}
	else {
		hAPI.setCardValue("leitoresCopia", leitoresCopia+' , '+leitorAtual);
	}
	
	// Esvaziando campo Leitor
	hAPI.setCardValue("leitor", "");
	
	// Tratamento dos leitores
	var leitores 	 = hAPI.getCardValue("leitores");
	log.info("==========[ beforeStateEntry - ativLeitor - leitores ]========== " + leitores);
	
	if (leitores != '') {
		var arrayLeitores = [];
		arrayLeitores = leitores.split(',');
		log.info("==========[ beforeStateEntry - ativLeitor - arrayLeitores ]========== " + arrayLeitores);
		
		var leitor = arrayLeitores[0];
		log.info("==========[ beforeStateEntry - ativLeitor - arrayLeitores[0] ]========== " + leitor);
		hAPI.setCardValue("leitor",leitor);
		
		var qtd_arrayLeitores = arrayLeitores.length;
		log.info("==========[ beforeStateEntry - ativLeitor - qtd_arrayLeitores ]========== " + qtd_arrayLeitores);
		
		var arrayLeitoresTemp = [];
		if ( qtd_arrayLeitores > 1){ // Quando há mais de um usuário em cópia
			for (var i = 1; i < qtd_arrayLeitores; i++ ) {
				arrayLeitoresTemp.push(arrayLeitores[i]);
			}
			log.info("==========[ beforeStateEntry - ativLeitor - arrayLeitoresTemp ]========== " + arrayLeitoresTemp);
			hAPI.setCardValue("leitores",arrayLeitoresTemp);
		}
		else {// Quando há somente um usuário em cópia
			hAPI.setCardValue("leitores",'');
		}
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
		var despacho   = hAPI.getCardValue("despacho");
		
		//Capturando função e lotação do usuário
		var consulta = DatasetFactory.createConstraint("CODUSUARIO", userLogado, userLogado, ConstraintType.MUST);
		var constraints = new Array(consulta);
		log.info("==========[ _RM_DADOS_COLABORADORES - constraints ]========== " + constraints);
		
		// coleta dados do dataset, utlizando filtro
		var datasetRetorno = DatasetFactory.getDataset("_RM_DADOS_COLABORADORES", null, constraints, null);
		log.info("==========[ _RM_DADOS_COLABORADORES - datasetRetorno ] ========== " + datasetRetorno);	
		
		var nomeSecao  = datasetRetorno.getValue(0, "NOME_SECAO");
		var nomeFuncao = datasetRetorno.getValue(0, "NOME_FUNCAO");
		
		
		
		if (despacho != ""){
			
			var nome_Completo 		= nomeCompleto(userLogado);
			var quebraLinha			= "\n \n ********************************************************************************************************************************************************************************** \n \n ";
			var historicoDespacho 	= hAPI.getCardValue("historicoDespacho");
			// Formatando
			var dataFormatada = dataAtualFormatada(); 
			var concatenando = 'Colaborador(a): '+nome_Completo+' \n Função: '+nomeFuncao+' \n Seção: '+nomeSecao+' \n Data: '+dataFormatada+' \n Despacho: '+despacho;
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

function ordernarLeitoresCopia(){
	log.info("==========[ expediente_digital.beforeStateEntry - ordernarLeitoresCopia - Entrou ] ========== ");	
	
	var leitoresCopia = hAPI.getCardValue("leitoresCopia");
	log.info("==========[ expediente_digital.beforeStateEntry - ordernarLeitoresCopia - leitoresCopia ] ========== "+leitoresCopia);
	
	if ( leitoresCopia != '' ){
		leitoresCopia = leitoresCopia.split(' , ');
		
		var qtd_leitoresCopia = leitoresCopia.length;
		log.info("==========[ expediente_digital.beforeStateEntry - ordernarLeitoresCopia - qtd_leitoresCopia ] ========== "+qtd_leitoresCopia);
		
		if ( qtd_leitoresCopia > 1 ) {
			leitoresCopia = leitoresCopia.sort(); // Ordenando a lista
			
			var leitoresCopiaOrdenado = '';
			for (var i= 0 ;i < qtd_leitoresCopia; i++) {
				if (i==0) {
					leitoresCopiaOrdenado = leitoresCopia[i];
				}
				else {
					leitoresCopiaOrdenado = leitoresCopiaOrdenado+' , '+leitoresCopia[i];
				} 
			}
			log.info("==========[ expediente_digital.beforeStateEntry - ordernarLeitoresCopia - leitoresCopiaOrdenado ] ========== "+leitoresCopiaOrdenado);
			hAPI.setCardValue("leitoresCopia", leitoresCopiaOrdenado);
		}
	}
}

