# Cliente APP FRONT

Este pequeno projeto tem como objetivo realizar a visualização do sistema de controle de informações dos clientes de uma pequena empresa através de uma interface desenvolvida em html, css e javascript.

O objetivo aqui é demonstrar parte do conhecimento adquirido durante a disciplina de **Arquitetura de Software** 

---
## Como executar em modo de desenvolvimento

Basta fazer o download do projeto e abrir o arquivo index.html licalizado na pasta **src** no seu browser.

## Como executar através do Docker

Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.

Navegue até o diretório que contém o Dockerfile e seus arquivos de aplicação no terminal. Execute **como administrador** o seguinte comando para construir a imagem Docker:

```
$ docker build -t cliente-front .
```

Uma vez criada a imagem, para executar o container basta executar, **como administrador**, seguinte o comando:

```
$ docker run -d -p 8080:80 cliente-front
```

Uma vez executando, para acessar o front-end, basta abrir o [http://localhost:8080/#/](http://localhost:8080/#/) no navegador.


### Alguns comandos úteis do Docker

>**Para criar uma imagem** você pode executar o seguinte comando:
>
>```
>$ docker build -t <IMAGE NAME> .
>```
>Subistituindo o `IMAGE NAME` pelo nome da imagem que se deseja criar
>
>**Para executar um container** você pode executar o seguinte comando:
>
>```
>$ docker run -d -p <PORT> <IMAGE NAME> .
>```
>Subistituindo o `IMAGE NAME` pelo nome da imagem desejada e `PORT` pela porta de acesso desejada.
>
>**Para verificar se a imagem foi criada** você pode executar o seguinte comando:
>
>```
>$ docker images
>```
>
> Caso queira **remover uma imagem**, basta executar o comando:
>```
>$ docker rmi <IMAGE ID>
>```
>Subistituindo o `IMAGE ID` pelo código da imagem
>
>**Para verificar se o container está em exceução** você pode executar o seguinte comando:
>
>```
>$ docker container ls --all
>```
>
> Caso queira **parar um conatiner**, basta executar o comando:
>```
>$ docker stop <CONTAINER ID>
>```
>Subistituindo o `CONTAINER ID` pelo ID do conatiner
>
>
> Caso queira **destruir um conatiner**, basta executar o comando:
>```
>$ docker rm <CONTAINER ID>
>```
>Para mais comandos, veja a [documentação do docker](https://docs.docker.com/engine/reference/run/).