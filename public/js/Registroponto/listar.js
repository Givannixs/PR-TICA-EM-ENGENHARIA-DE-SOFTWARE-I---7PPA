
function Baterponto(dataAtual,primeiroponto, funcionarioid, entradarepouso,saidarepouso, saida,idregistroponto)
{ //alert('ola mundo '+ new Date(dataAtual).toLocaleString('pt-BR',{dateStyle:'short'}) +' '+ new Date(dataAtual).toLocaleTimeString() + ' '+ new Date(primeiroponto).toLocaleString('pt-BR',{dateStyle:'short'}) + ' '+ funcionarioid + 'entrada rep'+ entradarepouso + 'saida rep' + saidarepouso + 'saida '+ saida+ 'id registro ' + idregistroponto  );
var aux= new Date(dataAtual).getFullYear()+'-'+(new Date(dataAtual).getMonth()+parseInt(1))+'-'+new Date(dataAtual).getDate();

//alert( aux);
if(new Date(dataAtual).toLocaleString('pt-BR',{dateStyle:'short'})==new Date(primeiroponto).toLocaleString('pt-BR',{dateStyle:'short'}))
{  
   console.log(true);

   if(entradarepouso=='00:00:00')
   {    //segundo ponto do dia
        console.log('true segundo ponto');
        const URL_TO_FETCH = '/registroponto/alterarregistroponto';
        fetch(URL_TO_FETCH,{
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            body: JSON.stringify({ entradaRepouso: new Date(dataAtual).toLocaleTimeString() ,saidaRepouso: saidarepouso,saida: saida, idregistroPonto: idregistroponto})
            
            }).then(function(response) {
            response.text().then(function(data) {
            console.log(data);
            });
            }).catch(function(err) {
            console.error('Failed retrieving information', err);
            });
   } 

   else
   {
            if(saidarepouso=='00:00:00')
            {        //terceiro ponto do dia
                console.log('true terceiro ponto');
                const URL_TO_FETCH = '/registroponto/alterarregistroponto';
                fetch(URL_TO_FETCH,{
                    method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                    body: JSON.stringify({ entradaRepouso: entradarepouso ,saidaRepouso: new Date(dataAtual).toLocaleTimeString(),saida: saida, idregistroPonto: idregistroponto})
                    
                    }).then(function(response) {
                    response.text().then(function(data) {
                    console.log(data);
                    });
                    }).catch(function(err) {
                    console.error('Failed retrieving information', err);
                    });
        
            }

            else
            {

                if(saida=='00:00:00')
                {    //quarto ponto do dia
             
                    const URL_TO_FETCH = '/registroponto/alterarregistroponto';
                fetch(URL_TO_FETCH,{
                    method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                    body: JSON.stringify({ entradaRepouso: entradarepouso ,saidaRepouso: saidarepouso,saida: new Date(dataAtual).toLocaleTimeString(), idregistroPonto: idregistroponto})
                    
                    }).then(function(response) {
                    response.text().then(function(data) {
                    console.log(data);
                    });
                    }).catch(function(err) {
                    console.error('Failed retrieving information', err);
                    });
        
                }

                else
                {
                    alert ("Todos os pontos do dia já foram batidos");
                  
                }
            }
   }

  

}

else
{   //primeiro ponto do dia
    console.log(false);
   

    const URL_TO_FETCH = '/registroponto/cadastrarresgistroponto';
    fetch(URL_TO_FETCH,{
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
           
        body: JSON.stringify({ data: aux, entrada: new Date(dataAtual).toLocaleTimeString() ,funcionario_idFuncionario: funcionarioid ,entradaRepouso: '',saidaRepouso: '',saida: ''})
        
        }).then(function(response) {
        response.text().then(function(data) {
        console.log(data);
        });
        }).catch(function(err) {
        console.error('Failed retrieving information', err);
        });

    
}
   window.location.reload();
}