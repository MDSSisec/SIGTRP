# Estrutura por Tipo: projectsList + projectTED / projectConvenio / projectEmenda

## Ideia geral

Cada tipo de projeto (TED, Convênio, Emenda) vira **uma feature própria**, com suas peculiaridades isoladas. O que é comum (lista de projetos, filtros, decisão de rota) fica na feature **projectsList**. Assim:

- Cada tipo tem formulários, modelo e regras só seus.
- Para **remover** um tipo no futuro: apaga a pasta da feature e remove as referências na lista/rotas. Nada de "desligar" código espalhado.
- Fica claro onde mexer quando só um tipo mudar.

---

## Estrutura recomendada

```
# Na raiz do projeto:
data/
└── projetos.json                  # Lista de projetos (id, nome, responsavel, status, tipo)

services/
└── project.service.ts             # Status compartilhado: getStatusStyle, statusToStepIndex, STATUS_*

# Features:
features/
├── projectsList/                  # Lista única de projetos (UI + filtros); dados e status em data/ e services/
│   ├── ProjectsList.tsx
│   ├── styles/
│   ├── index.ts                   # exporta ProjectsContent
│   └── ESTRUTURA-POR-TIPO.md      # este arquivo
│
├── projectTED/                    # Tudo que é específico de TED (TRP)
│   ├── edit/
│   ├── forms/
│   ├── model/
│   ├── services/
│   └── index.ts
│
├── projectConvenio/
├── projectEmenda/
└── ...
```

---

## Rotas

- **Lista (compartilhada):** `/InternalUser/projects` → `features/projectsList/ProjectsList.tsx`
- **Edição por tipo:** a lista monta o link com base em `projeto.tipo`:
  - TED      → `/InternalUser/projects/ted/[id]`   → `projectTED/edit/ProjectTEDEdit.tsx`
  - Convênio → `/InternalUser/projects/convenio/[id]` → `projectConvenio/edit/...`
  - Emenda   → `/InternalUser/projects/emenda/[id]`   → `projectEmenda/edit/...`

---

## Como remover um tipo no futuro (ex.: Convênio)

1. **Apagar a feature:** excluir a pasta `features/projectConvenio/`.
2. **Remover a rota:** excluir `app/(private)/InternalUser/projects/convenio/`.
3. **Ajustar constantes:** tirar `"Convenio"` de `PROJECT_TYPES` e de `PROJECT_TYPE_OPTIONS` em `constants/project.ts`.
4. **Sidebar/navegação:** se houver link direto para "Projetos Convênio", remover.

Nenhum código de TED ou Emenda é mexido; a lista continua mostrando só os tipos que ainda existem nas constantes.
