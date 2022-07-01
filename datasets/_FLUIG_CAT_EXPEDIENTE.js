
function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
       
    log.info("DATASET _FLUIG_CAT_EXPEDIENTE ENTROU " );
    
    //Cria as colunas
    dataset.addColumn("CATEGORIA");
    
      
    //Cria os registros
    dataset.addRow(new Array("Autorização de despesa"));
    dataset.addRow(new Array("Consulta"));
    dataset.addRow(new Array("Contrato"));
    dataset.addRow(new Array("Correspondência interna"));
    dataset.addRow(new Array("Parecer Legislativo"));
    dataset.addRow(new Array("PASPFE - Aquisição de sede prória"));
    dataset.addRow(new Array("Outros"));

    
    
    return dataset;


}



/*
function defineStructure() {

}
function onSync(lastSyncDate) {

}

function onMobileSync(user) {

}
*/