
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
    var html=" <option value='' selected>Selecione o departamento</option>";
    const URL_TO_FETCH = '/departamentos/listarfetch';
    
    

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
   var html=" <option value='' selected>Selecione o departamento</option>";
    var i;

   for (let index = 0; index < listdepartamento.length; index++) {
   
    if(listdepartamento[index][1]==document.getElementById('tlfuncionarioEscala'+cod).innerText)
     {console.log(listdepartamento[index][1]+'=='+document.getElementById('tlfuncionarioEscala'+cod).innerText);
      html=" <option value='"+listdepartamento[index][0]+"'selected>"+listdepartamento[index][1]+"</option>";
      i=index;
     } 
  }

fetch(URL_TO_FETCH).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
      for (var index = 0; index < data.length; index++) {
        if(index!=i)
        html =html+" <option value="+data[index][0]+">"+data[index][1]+"</option>";
        
      }
      document.getElementById("departamentoalt"+cod).innerHTML=html;
    });
  }).catch(function(err) {
    console.error('Failed retrieving information', err);
  });
      
}