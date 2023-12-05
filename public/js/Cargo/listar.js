
document.addEventListener("DOMContentLoaded", function() {
    //alert('exibiu')
})

function carregarProduto() {

    //fetch('/json')
    //.then
}


let listdecargo;

function listardepartamento()
{  
   
    const URL_TO_FETCH = '/cargos/listarfetch';
    var html=" <option selected>Selecione o cargo</option>";

fetch(URL_TO_FETCH).then(function(response) {
    response.json().then(function(data) {
      console.log(listdecargo=data); 
      for (var index = 0; index < data.length; index++) {
        html =html+" <option value="+data[index][0]+">"+data[index][1]+"</option>";
        
      }
      document.getElementById("cargo_idCargo").innerHTML=html;
    });
  }).catch(function(err) {
    console.error('Failed retrieving information', err);
  });
      
}



function listardepartamentoalt(cod)
{  const URL_TO_FETCH = '/cargos/listarfetch';
   var html=" <option selected>Selecione o cargo</option>";

fetch(URL_TO_FETCH).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
      for (var index = 0; index < data.length; index++) {
        html =html+" <option value="+data[index][0]+">"+data[index][1]+"</option>";
        
      }
      document.getElementById("cargoalt"+cod).innerHTML=html;
    });
  }).catch(function(err) {
    console.error('Failed retrieving information', err);
  });
      
}

function setardepartamento(valor)
{
    console.log(valor);

    for (let index = 0; index < listdecargo.length; index++) {
        if(listdecargo[index][0]==valor)
        {
            document.getElementById('dp').value=listdecargo[index][2];
            document.getElementById('dp').innerHTML=listdecargo[index][3];
        }
        
    }

}



function setardepartamentoalt(valor)
{
    console.log('teste'+valor);

    for (let index = 0; index < listdecargo.length; index++) {
     
        if(listdecargo[index][0]==valor)
        { 
            document.getElementById('dpalt'+valor).value=listdecargo[index][2];
            document.getElementById('dpalt'+valor).innerHTML=listdecargo[index][3];
        }
        
    }

}