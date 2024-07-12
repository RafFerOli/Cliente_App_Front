/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = 'http://127.0.0.1:5000/Clientes';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.clientes.forEach(item => insertList(item.nome, item.cnpj, item.razao, 
                                                 item.endereco, item.numero, item.cidade,
                                                 item.estado, item.bairro, item.cep, 
                                                 item.telefone, item.email ))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
  getList()
    
  /*
    --------------------------------------------------------------------------------------
    Função para inserir items na lista apresentada
    --------------------------------------------------------------------------------------
  */
  const insertList = (nome, cnpj, razao, 
                      endereco, numero, cidade,
                      estado, bairro, cep, 
                      telefone, email ) => {
    var item = [nome, cnpj, razao, 
                endereco, numero, cidade,
                estado, bairro, cep, 
                telefone, email]
    var table = document.getElementById('tabela');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
  }