function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var gestor 		= 5; 
	var colaborador = 9;
	
    var atividade  = getValue("WKNumState");
    var comentario = getValue("WKUserComment"); 

    if (atividade == gestor || atividade == colaborador) {
        if (comentario == "") {
            throw "Obrigatório informar um Complemento."
        }
    }
}