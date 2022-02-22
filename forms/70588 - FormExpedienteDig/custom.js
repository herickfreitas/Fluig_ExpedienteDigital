function filtrazoomEmpregado(usuarioLogado) {
	
	var gestorLogado = usuarioLogado; 
	console.log("gestorLogado: "+ gestorLogado);

	var filterValues = "CODUSUARIO_CHEFE," + gestorLogado;
	console.log("filterValues: "+ filterValues);
	
	reloadZoomFilterValues('colaborador', filterValues);
}

function filtrazoomGestorEmpregado(usuarioLogado) {
	
	var filterValues = "CODUSUARIO," + usuarioLogado;
	console.log("filtrazoomGestorEmpregado filterValues: "+ filterValues);

	reloadZoomFilterValues('gestor', filterValues);
}

function filtrazoomEquipeEmpregado(usuarioLogado) {
	
	// Preparacao de filtro para consulta
	var c1 = DatasetFactory.createConstraint("CODUSUARIO", usuarioLogado, usuarioLogado, ConstraintType.MUST);
	var constraints = new Array(c1);
	// chamada no dataset
	var datasetColaboradores = DatasetFactory.getDataset("_RM_COLABORADORES", null, constraints, null);
	// Gravando valores de retorno
	var records = datasetColaboradores.values; 
	var gestor = records[0].CODUSUARIO_CHEFE;
	console.log("gestor: "+gestor);
	// aplicando filtro no campo zoom do formulário
	var filterValues = "CODUSUARIO_CHEFE," + gestor;
	console.log("filtrazoomEmpregado filterValues: "+ filterValues);
	reloadZoomFilterValues('colaborador', filterValues);
}