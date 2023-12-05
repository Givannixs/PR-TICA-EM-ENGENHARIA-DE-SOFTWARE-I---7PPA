document.addEventListener("DOMContentLoaded", function() {
    //alert('exibiu')
})

function carregarProduto() {

    //fetch('/json')
    //.then
}


let listdeescala;

function listarescalas()
{  
   
    const URL_TO_FETCH = '/escalas/listarfetch';
    var html=" <option selected>Selecione a escala</option>";

fetch(URL_TO_FETCH).then(function(response) {
    response.json().then(function(data) {
      console.log(listdeescala=data); 
      for (var index = 0; index < data.length; index++) {
        html =html+" <option value="+data[index][0]+">"+data[index][1]+"</option>";
        
      }
      document.getElementById("funcionarioEscala").innerHTML=html;
    });
  }).catch(function(err) {
    console.error('Failed retrieving information', err);
  });
      
}



function listarescalaalt(cod)
{  const URL_TO_FETCH = '/escalas/listarfetch';
   var html=" <option selected>Selecione a escala</option>";

fetch(URL_TO_FETCH).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
      for (var index = 0; index < data.length; index++) {
        html =html+" <option value="+data[index][0]+">"+data[index][1]+"</option>";
        
      }
      document.getElementById("escalaalt"+cod).innerHTML=html;
    });
  }).catch(function(err) {
    console.error('Failed retrieving information', err);
  });
      
}