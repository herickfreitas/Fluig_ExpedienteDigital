function filtrazoom() {
	
	var gestorAnterior 	= document.getElementById("gestorAnterior").value; 
	console.log("gestorAnterior: "+ gestorAnterior);
	
	var filterValues = "CODUSUARIO_CHEFE," + gestorAnterior;
	console.log("filterValues: "+ filterValues);
	
	reloadZoomFilterValues('zoomColaborador', filterValues);
	
}
