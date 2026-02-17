# lib

Esta pasta contém código reutilizável da aplicação que não pertence diretamente a uma tela específica.

Aqui ficam regras de negócio, estados globais, tipagens, serviços e utilitários.

## Estrutura

* `contexts/` → estados globais com React Context
* `hooks/` → hooks reutilizáveis
* `services/` → comunicação com APIs e lógica de dados
* `types/` → tipagens globais do sistema
* `utils/` → funções utilitárias puras

## Regras

* Nada aqui deve depender de páginas específicas.
* Tudo deve ser reutilizável em qualquer parte do sistema.
* Sempre tipar corretamente.
* Evitar lógica de UI.
