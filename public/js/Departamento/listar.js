
document.addEventListener("DOMContentLoaded", function() {
    //alert('exibiu')
})

function carregarProduto() {

    //fetch('/json')
    //.then
}


let listdepartamento;

function listardepartamento()
{  
   
    const URL_TO_FETCH = '/departamentos/listarfetch';
    var html=" <option selected>Selecione o departamento</option>";

fetch(URL_TO_FETCH).then(function(response) {
    response.json().then(function(data) {
      console.log(listdepartamento=data); 
      for (var index = 0; index < data.length; index++) {
        html =html+" <option value="+data[index][0]+">"+data[index][1]+"</option>";
        
      }
      document.getElementById("departamento_idDepartamento").innerHTML=html;
    });
  }).catch(function(err) {
    console.error('Failed retrieving information', err);
  });
      
}



function listardepartamentoalt(cod)
{  const URL_TO_FETCH = '/departamentos/listarfetch';
   var html=" <option selected>Selecione o departamento</option>";

fetch(URL_TO_FETCH).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
      for (var index = 0; index < data.length; index++) {
        html =html+" <option value="+data[index][0]+">"+data[index][1]+"</option>";
        
      }
      document.getElementById("departamentoalt"+cod).innerHTML=html;
    });
  }).catch(function(err) {
    console.error('Failed retrieving information', err);
  });
      
}