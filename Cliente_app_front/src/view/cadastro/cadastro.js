/*--------------------------------------------------------------------------------------
  Função para cadastrar registro de cliente
 --------------------------------------------------------------------------------------*/
const novocliente = () => {
      //Pega informações da tela
      let inputnome = document.getElementById("nome").value;
      let inputcnpj = document.getElementById("cnpj").value;
      let inputrazao = document.getElementById("razao").value;
      let inputendereco = document.getElementById("endereco").value;
      let inputnumero = document.getElementById("numero").value;
      let inputcidade = document.getElementById("cidade").value;
      let inputestado = document.getElementById("estado").value;
      let inputbairro = document.getElementById("bairro").value;
      let inputcep = document.getElementById("cep").value;
      let inputtelefone = document.getElementById("telefone").value;
      let inputemail = document.getElementById("email").value;
  
      //Realiza requisição POST
      postItem(inputnome, inputcnpj, inputrazao,
               inputendereco, inputnumero, inputcidade, 
               inputestado, inputbairro, inputcep, 
               inputtelefone, inputemail)        
  }
  
/* --------------------------------------------------------------------------------------
   Função para atualizar registro de cliente especifico usando o método POST
--------------------------------------------------------------------------------------*/
const postItem = async (inputnome, inputcnpj, inputrazao,
                          inputendereco, inputnumero, inputcidade, 
                          inputestado, inputbairro, inputcep, 
                          inputtelefone, inputemail) =>   {

        //Pega dados para enviar a base
        const formData = new FormData();
        formData.append("nome", inputnome);
        formData.append("cnpj", inputcnpj);
        formData.append("razao",inputrazao);
        formData.append("endereco",inputendereco);
        formData.append("numero",inputnumero);
        formData.append("cidade",inputcidade);
        formData.append("estado",inputestado);
        formData.append("bairro",inputbairro);
        formData.append("cep",inputcep);
        formData.append("telefone",inputtelefone);
        formData.append("email",inputemail);

      //Aplica rota para requisição de serviço
      let url = 'http://127.0.0.1:5000/Cliente';
      fetch(url, {
          method: 'post',
          body: formData
          })
          .then((response) => 
            { response.json();
              if (response.status === 200)
                { alert('Cliente cadastrado com sucesso!');}
            })
          .catch((error) => {
            console.error('Error:', error);
            alert('Não foi possível cadastrar o cliente.');
          });
  }

 /*--------------------------------------------------------------------------------------
  Função para pesquisar cnpj na api externa ao pressionar tecla enter
 --------------------------------------------------------------------------------------*/
document.getElementById('cnpj').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      consultarCNPJ();
    }
  });