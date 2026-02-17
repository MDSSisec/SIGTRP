# hooks

Contém hooks React reutilizáveis da aplicação.

Hooks servem para encapsular lógica reutilizável de comportamento.

## O que colocar aqui

* hooks de lógica de negócio
* hooks que combinam context + state + effects
* hooks que organizam comportamento complexo

## Padrão de nome

Todos devem começar com:

useAlgumaCoisa.ts

Exemplos:

* useProjects.ts
* useAuth.ts
* useDebounce.ts

## Regras

* hooks não devem renderizar JSX
* hooks não devem conter estilos
* hooks devem ser reutilizáveis
* sempre tipar retorno
