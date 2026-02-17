# contexts

Armazena estados globais compartilhados usando React Context API.

Use esta pasta quando vários componentes precisam acessar o mesmo estado.

## O que colocar aqui

Cada contexto deve conter:

* criação do context
* provider
* hook de acesso (useContext customizado)

## Padrão de nome

NomeDoContext.context.tsx

Exemplos:

* breadcrumb-context.tsx
* project-data-context.tsx

## Quando usar context

Use apenas para estado global como:

* usuário logado
* tema
* breadcrumb
* dados compartilhados de formulário
* permissões

## Quando NÃO usar

Não usar para:

* estado local de componente
* fetch de dados (use services)
* lógica de UI
