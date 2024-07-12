/* --------------------------------------------------------------------------------------
   Função para consultar via requisição GET as informações do cliente através do cnpj em cadastro.html
--------------------------------------------------------------------------------------*/
function consultarCNPJ(){

    // Remove caracteres que não são letras ou números do cnpj
    const cnpjInput = document.getElementById("cnpj").value.replace(/[^a-zA-Z0-9]/g, '');

    if(cnpjInput!=''){

        //Consulta cnpj em api externa (limite de 3 consultas por minuto)
        const apiUrl = "https://publica.cnpj.ws/cnpj/"; // URL da APIexterna       

        document.getElementById("consulta").textContent = "Consultando...";
    
        fetch(apiUrl + cnpjInput)
            .then(response => response.json())
            .then(data => {
                // Preencha os campos do formulário com os dados retornados pela API
                document.getElementById("razao").value = data.razao_social;
                document.getElementById("endereco").value = data.estabelecimento.tipo_logradouro + " " + data.estabelecimento.logradouro;
                document.getElementById("numero").value = data.estabelecimento.numero;
                document.getElementById("cidade").value = data.estabelecimento.cidade.nome;
                document.getElementById("estado").value = data.estabelecimento.estado.sigla;
                document.getElementById("bairro").value = data.estabelecimento.bairro;
                document.getElementById("cep").value = data.estabelecimento.cep;
                document.getElementById("telefone").value = "("+ data.estabelecimento.ddd1 +")" + data.estabelecimento.telefone1;
                document.getElementById("email").value = data.estabelecimento.email;

                document.getElementById("cep").value = FormatInput(document.getElementById("cep"));
                document.getElementById("telefone").value = FormatInput(document.getElementById("telefone"));

                document.getElementById("consulta").textContent = "Consultar";
            })
            .catch(error => {
                document.getElementById("consulta").textContent = "Consultar";

                console.error("Erro na consulta de CNPJ:", error);
            });
    }
    else
    {
        alert('Por favor, digite um cnpj para consulta!');
    }
}

