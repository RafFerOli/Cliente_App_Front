/*--------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------*/
const getList = async () => {
    let url = 'http://127.0.0.1:5000/Clientes';
    let insertedCount = 0;
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.clientes.reverse().forEach(item => {
          if (insertedCount < 20) { // Limita 20 linhas para aparecer
            insertList(item.nome, item.telefone, item.email);
            insertedCount++;
          }
        })
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Não foi possível se comunicar com a base.');
      });
  }

// Chamada da função para carregamento inicial dos dados
getList();

/*--------------------------------------------------------------------------------------
    Função para inserir items na tabela apresentada
  --------------------------------------------------------------------------------------*/
const insertList = (nome, telefone, email) => {
    var item = [nome, telefone, email]
    var table = document.getElementById('tabela');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }

    insertButton(row.insertCell(-1))
    removeElement();
  }

/*  --------------------------------------------------------------------------------------
    Função para pegar nome do cliente na tabela para pesquisa
  --------------------------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', (event) => {
  const tabela = document.getElementById('tabela');

    tabela.addEventListener('click', (event) => {
      const linha = event.target.closest('tr');
        if (linha && linha.parentNode.tagName.toLowerCase() === 'tbody') {
            const primeiraColuna = linha.querySelector('td');
            const primeiroValor = primeiraColuna ? primeiraColuna.textContent : null;
            console.log(primeiroValor);

            // Aqui você pode fazer algo com o primeiro valor, como exibi-lo em um alerta
            document.getElementById("nome").value = primeiroValor; 

            getValues(primeiroValor);
            
          }
      });
  });
  
/*  --------------------------------------------------------------------------------------
  Função para obter as informações existentes de um cliente espscífico do servidor via requisição GET
  --------------------------------------------------------------------------------------*/

const getValues = async (nomequery) => {
  let url = 'http://127.0.0.1:5000/Cliente?nome=' + nomequery;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      insertValues(data.nome, data.cnpj, data.razao, 
                   data.endereco, data.numero, data.cidade,
                   data.estado, data.bairro, data.cep, 
                   data.telefone, data.email
      );
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Não foi possível encontrar o cliente desejado.');
    });
  }

/*  --------------------------------------------------------------------------------------
    Função para inserir items nos componentes da tela 
  --------------------------------------------------------------------------------------*/
  const insertValues = (nome, cnpj, razao, endereco,
                          numero, cidade, estado, bairro,
                          cep, telefone, email) => {

      // Envia valores recebidos para os campos na tela
      document.getElementById("nome").value = nome; 
      document.getElementById("cnpj").value = cnpj; 
      document.getElementById("razao").value = razao; 
      document.getElementById("endereco").value = endereco; 
      document.getElementById("numero").value = numero; 
      document.getElementById("cidade").value = cidade; 
      document.getElementById("estado").value = estado; 
      document.getElementById("bairro").value = bairro; 
      document.getElementById("cep").value = cep; 
      document.getElementById("telefone").value = telefone; 
      document.getElementById("email").value = email;      

  }

/*--------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
--------------------------------------------------------------------------------------*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*--------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove();
        deleteItem(nomeItem);      
      }
    }
  }
}

/*--------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via método DELETE
--------------------------------------------------------------------------------------*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/Cliente?nome=' + item;

  fetch(url, {
    method: 'delete'
  })
    .then((response) => 
      { response.json();
        if (response.status === 200)
          { alert('Cliente removido com sucesso!');

            // Apaga valores dos campos da tela
            document.getElementById("nome").value = ' '; 
            document.getElementById("cnpj").value = ' '; 
            document.getElementById("razao").value = ' '; 
            document.getElementById("endereco").value = ' '; 
            document.getElementById("numero").value = ' '; 
            document.getElementById("cidade").value = ' '; 
            document.getElementById("estado").value = ' '; 
            document.getElementById("bairro").value = ' '; 
            document.getElementById("cep").value = ' '; 
            document.getElementById("telefone").value = ' '; 
            document.getElementById("email").value = ' '; 
          }
      })
    .catch((error) => {
      console.error('Error:', error);
      alert('Não foi possível remover o cliente.');
    });
}

/*--------------------------------------------------------------------------------------
  Função para abrir tela de novo cadastro
--------------------------------------------------------------------------------------*/
function openPopup(url) {
  const width = 800;
  const height = 1000;
  const popupWindow = window.open(url, 'popupWindow', `width=${width},height=${height},resizable=yes,scrollbars=yes`);

  //verifica se o pup foi fechado para atualizar tela inicial
  const timer = setInterval(function() {
    if (popupWindow.closed) {
      clearInterval(timer);
      location.reload();
    }
  }, 500);
}

/*--------------------------------------------------------------------------------------
  Função para pesquisar cliente cadastrado ao pressionar botão
  --------------------------------------------------------------------------------------*/
function Pesquisar() {
  
  //Apaga todos os elementos da tabela
  const tableBody = document.getElementById('tabela').getElementsByTagName('tbody')[0];
  while (tableBody.rows.length > 1) {tableBody.deleteRow(1);}

  //Preenche com resultado da pesquisa
  getQuery(document.getElementById("pesquisa").value);
}

/*--------------------------------------------------------------------------------------
  Função para pesquisar cliente cadastrado ao pressionar tecla enter
  --------------------------------------------------------------------------------------*/
document.getElementById('pesquisa').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    Pesquisar();
  }
});

/*--------------------------------------------------------------------------------------
  Função para obter resultado da pesquisa do servidor via requisição GET
  --------------------------------------------------------------------------------------*/
const getQuery = async (nomequery) => {
  let url = 'http://127.0.0.1:5000/Cliente?nome=' + nomequery;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      insertList(data.nome, data.telefone, data.email);
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Não foi possível encontrar o cliente informado!');
    });
  }

 /*--------------------------------------------------------------------------------------
  Função para pesquisar cliente cadastrado ao pesquisar botão
  --------------------------------------------------------------------------------------*/
function Pesquisar() {
  
  const tableBody = document.getElementById('tabela').getElementsByTagName('tbody')[0];

  while (tableBody.rows.length > 1) {tableBody.deleteRow(1);}

  getQuery(document.getElementById("pesquisa").value);
}

 /*--------------------------------------------------------------------------------------
  Função para abrir google maps com cep encontrado
  --------------------------------------------------------------------------------------*/
function Encontrar() {
  if(document.getElementById("cep").value!='')
  {
    const url = "https://www.google.com/maps/place/" + document.getElementById("cep").value + ':' +
    document.getElementById("endereco").value + ',' + document.getElementById("numero").value;
    window.open(url, '_blank');
  }
  else
  {
    alert('Por favor, digite um cep para pesquisa!');
  }
}

 /*--------------------------------------------------------------------------------------
  Função para atualizar registro de cliente
  --------------------------------------------------------------------------------------*/
const Atualizar = () => 
  {
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
  
      //Realiza requisição PUT
      putItem(inputnome, inputcnpj, inputrazao,
               inputendereco, inputnumero, inputcidade, 
               inputestado, inputbairro, inputcep, 
               inputtelefone, inputemail)        
  }
  
/*--------------------------------------------------------------------------------------
   Função para atualizar registro de cliente especifico usando o método PUT
--------------------------------------------------------------------------------------*/
  const putItem = async (inputnome, inputcnpj, inputrazao,
                          inputendereco, inputnumero, inputcidade, 
                          inputestado, inputbairro, inputcep, 
                          inputtelefone, inputemail) => 
  {
  
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
          method: 'put',
          body: formData
          })
          .then((response) => 
            { response.json();
              if (response.status === 200)
                { alert('Cliente atualizado com sucesso!');}
            })
          .catch((error) => {
            console.error('Error:', error);
            alert('Não foi possível atualiza o cliente.');
          });
    }


