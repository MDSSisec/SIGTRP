# File Tree: sigtrp

**Generated:** 2/14/2026, 6:10:24 PM
**Root Path:** `/Users/lucasfontoura/Documents/lucas/Projetos_React/sigtrp`

```
├── 📁 app
│   ├── 📁 (private)
│   │   ├── 📁 ExternalUser
│   │   │   ├── 📁 home
│   │   │   │   ├── 📄 home.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📁 projects
│   │   │       ├── 📄 page.tsx
│   │   │       └── 📄 projects.tsx
│   │   ├── 📁 InternalUser
│   │   │   ├── 📁 config
│   │   │   │   ├── 📁 configSistema
│   │   │   │   │   ├── 📄 configSistema.tsx
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📁 externalUser
│   │   │   │   │   ├── 📄 externalUsers.tsx
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   └── 📁 internalUser
│   │   │   │       ├── 📄 internalUsers.tsx
│   │   │   │       └── 📄 page.tsx
│   │   │   ├── 📁 home
│   │   │   │   ├── 📄 home.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📁 projects
│   │   │       ├── 📁 [id]
│   │   │       │   ├── 📄 page.tsx
│   │   │       │   └── 📄 projectEdit.tsx
│   │   │       ├── ⚙️ dataProjetos.json
│   │   │       ├── 📄 page.tsx
│   │   │       ├── 📄 projects.tsx
│   │   │       ├── ⚙️ projetoModelo.json
│   │   │       └── 📄 projetoModelo.txt
│   │   ├── 📄 layout.tsx
│   │   └── 📄 private-shell.tsx
│   ├── 📄 favicon.ico
│   ├── 🎨 globals.css
│   ├── 📄 layout.tsx
│   └── 📄 page.tsx
├── 📁 components
│   ├── 📁 projectForms
│   │   ├── 📁 observacoes
│   │   │   └── 📄 Observacoes.tsx
│   │   ├── 📁 secao-1-identificacao
│   │   │   ├── 📄 IdentificacaoProjeto.tsx
│   │   │   ├── 📄 IdentificacaoProponente.tsx
│   │   │   ├── 📄 IdentificacaoRepresentanteLegal.tsx
│   │   │   └── 📄 IdentificacaoResponsavelTecnico.tsx
│   │   ├── 📁 secao-2-descricao
│   │   │   ├── 📁 etapas-cronograma
│   │   │   │   ├── 📄 EtapaItem.tsx
│   │   │   │   ├── 📄 MetaCronogramaCard.tsx
│   │   │   │   ├── 📄 index.tsx
│   │   │   │   └── 📄 types.ts
│   │   │   ├── 📄 CronogramaContext.tsx
│   │   │   ├── 📄 EtapasCronograma.tsx
│   │   │   ├── 📄 GestaoProjeto.tsx
│   │   │   ├── 📄 Justificativa.tsx
│   │   │   ├── 📄 Metas.tsx
│   │   │   ├── 📄 Metodologia.tsx
│   │   │   ├── 📄 Objetivos.tsx
│   │   │   └── 📄 ResultadosEsperados.tsx
│   │   ├── 📁 secao-3-participantes
│   │   │   ├── 📄 BaseTerritorial.tsx
│   │   │   ├── 📄 HistoricoSituacaoTerritorio.tsx
│   │   │   ├── 📄 PerfilSocioOcupacional.tsx
│   │   │   ├── 📄 PovosComunidadesTradicionais.tsx
│   │   │   ├── 📄 PublicoBeneficiario.tsx
│   │   │   └── 📄 ServicosAcessados.tsx
│   │   ├── 📁 secao-4-caracterizacao
│   │   │   └── 📄 OutrasInformacoesProponente.tsx
│   │   ├── 📁 secao-5-planilhas
│   │   │   ├── 📄 CronogramaDesembolso.tsx
│   │   │   ├── 📄 DetalhamentoOrcamento.tsx
│   │   │   ├── 📄 ResumoPlanoAplicacao.tsx
│   │   │   └── 📄 ValorTotal.tsx
│   │   ├── 📁 secao-6-monitoramento
│   │   │   ├── 📄 IndicadoresEficiencia.tsx
│   │   │   └── 📄 ProcedimentosMonitoramento.tsx
│   │   ├── 📁 visaoGeralProjeto
│   │   │   ├── 🎨 visaoGeralDoProjeto.module.css
│   │   │   └── 📄 visaoGeralDoProjeto.tsx
│   │   └── 📄 index.tsx
│   ├── 📁 shared
│   │   ├── 📁 Accordion
│   │   │   └── 📄 accordion.tsx
│   │   ├── 📁 ActionCard
│   │   │   └── 📄 actionCard.tsx
│   │   ├── 📁 Buttons
│   │   │   ├── 📄 createMoney.tsx
│   │   │   ├── 📄 genericButton.tsx
│   │   │   ├── 📄 inputDate.tsx
│   │   │   ├── 📄 inputMoney.tsx
│   │   │   ├── 📄 inputText.tsx
│   │   │   └── 📄 openPopUpButton.tsx
│   │   ├── 📁 GenericFilter
│   │   │   └── 📄 genericFilter.tsx
│   │   ├── 📁 PopUps
│   │   │   └── 📁 Generico
│   │   │       └── 📄 popUpGenerico.tsx
│   │   ├── 📁 StatusStepper
│   │   │   ├── 🎨 statusStepper.module.css
│   │   │   └── 📄 statusStepper.tsx
│   │   ├── 📁 Tables
│   │   │   ├── 📁 GenericTable
│   │   │   │   ├── 🎨 genericTable.module.css
│   │   │   │   └── 📄 genericTable.tsx
│   │   │   └── 📄 table.tsx
│   │   └── 📁 Totais
│   │       └── 📁 TotalCard
│   │           ├── 🎨 totalCard.module.css
│   │           └── 📄 totalCard.tsx
│   ├── 📁 ui
│   │   ├── 📄 avatar.tsx
│   │   ├── 📄 breadcrumb.tsx
│   │   ├── 📄 button-login.tsx
│   │   ├── 📄 button.tsx
│   │   ├── 📄 card.tsx
│   │   ├── 📄 card_login.tsx
│   │   ├── 📄 collapsible.tsx
│   │   ├── 📄 dropdown-menu.tsx
│   │   ├── 📄 field.tsx
│   │   ├── 📄 input.tsx
│   │   ├── 📄 label.tsx
│   │   ├── 📄 separator.tsx
│   │   ├── 📄 sheet.tsx
│   │   ├── 📄 sidebar.tsx
│   │   ├── 📄 skeleton.tsx
│   │   └── 📄 tooltip.tsx
│   ├── 📄 app-sidebar.tsx
│   ├── 📄 login-form.tsx
│   ├── 📄 nav-main.tsx
│   ├── 📄 nav-projects.tsx
│   ├── 📄 nav-user.tsx
│   └── 📄 team-switcher.tsx
├── 📁 constants
│   ├── 📁 login
│   └── 📁 menuLateral
├── 📁 hooks
│   └── 📄 use-mobile.ts
├── 📁 lib
│   ├── 📄 breadcrumb-context.tsx
│   ├── 📄 external-user.ts
│   ├── 📄 internal-user.ts
│   ├── 📄 project-data-context.tsx
│   ├── 📄 project-status.ts
│   ├── 📄 sidebar-config.ts
│   ├── 📄 sidebar-types.ts
│   └── 📄 utils.ts
├── 📁 public
│   ├── 🖼️ file.svg
│   ├── 🖼️ globe.svg
│   ├── 🖼️ next.svg
│   ├── 🖼️ vercel.svg
│   └── 🖼️ window.svg
├── ⚙️ .gitignore
├── 📝 README.md
├── ⚙️ components.json
├── 📄 eslint.config.mjs
├── 📄 next.config.ts
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 postcss.config.mjs
└── ⚙️ tsconfig.json
```

---
*Generated by FileTree Pro Extension*