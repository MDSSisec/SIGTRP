# services

Responsável pela comunicação com APIs e manipulação de dados externos.

Esta camada separa a lógica de dados da interface.

## O que colocar aqui

* chamadas HTTP
* integração com backend
* integração com banco de dados
* transformação de dados (DTO)
* regras de acesso a dados

## Regras

* nunca usar React aqui
* nunca usar useState ou useEffect
* funções devem ser puras ou async
* UI não deve acessar API diretamente (sempre via services)

## Exemplo

getProjects()
createProject()
updateProject()
deleteProject()
