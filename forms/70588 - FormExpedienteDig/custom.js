function filtrazoom(usuarioLogado) {
	
	var gestorLogado = usuarioLogado; 
	var gestorAnterior = document.getElementById("gestorAnterior").value; 
	console.log("gestorAnterior: "+ gestorLogado);
	
	if (gestorAnterior == "") {
		var filterValues = "CODUSUARIO_CHEFE," + gestorLogado;
		console.log("filterValues: "+ filterValues);
	}
	else {
		var filterValues = "CODUSUARIO_CHEFE," + gestorAnterior;
		console.log("filterValues: "+ filterValues);
	}

	reloadZoomFilterValues('colaborador', filterValues);
}
