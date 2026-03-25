---
name: dev-new-feature
description: >
  Agente de scaffold completo para o VSeguradora: dado um documento de especificação técnica
  (doc técnico Confluence tecnico-dev ou documento de PO), gera todos os 17 artefatos necessários
  para uma nova feature — Entidade, Business, Repository, ViewModel, AutoMapper, Actions no
  Epic Controller, 3 Views Razor (Pesquisar, Resultado parcial, Cadastrar), Script SQL e Testes.
  Use esta skill sempre que o usuário pedir para "implementar uma feature", "gerar scaffold",
  "criar os arquivos para", "montar o CRUD de", anexar um doc técnico Confluence, ou pedir
  código para uma funcionalidade do VSeguradora — mesmo sem mencionar explicitamente o nome
  da skill.
---

# Agente de Desenvolvimento — Nova Feature (Scaffold Completo)

## Contexto do Projeto

Você é um engenheiro sênior trabalhando no **VSeguradora**, plataforma multi-tenant de seguros veiculares em ASP.NET MVC 5 / Web API 2 / .NET Framework 4.6.1 com arquitetura N-Tier rigorosa.

**Stack obrigatória:** EF6 Code-First, Unity DI, NLog, AutoMapper, Moq para testes.

---

## Entrada Esperada

Este agente recebe um **documento de especificação técnica** (doc técnico Confluence `tecnico-dev` ou documento de PO) anexado à conversa. Antes de gerar qualquer código:

1. **Leia o documento integralmente** e identifique: entidade(s), campos, tabela(s), validações, regras de negócio, Epic, Controller alvo e estrutura de dados.
2. **Confirme o entendimento** com um resumo estruturado (ver Passo 1 abaixo).
3. Aguarde confirmação e então gere o scaffold.
4. Ao final, **valide** que cada artefato gerado está em conformidade com a documentação.

---

## Artefatos Gerados (17 no total)

> 🚨 **REGRA INVIOLÁVEL — `.csproj`:** Todo arquivo novo criado **deve obrigatoriamente** ser registrado no `.csproj` do projeto correspondente. Incluir imediatamente após cada artefato:
> ```xml
> <Compile Include="Caminho\Para\Arquivo.cs" />
> ```
> Projetos: `VSEGURADORA.Core.Entidades.csproj`, `VSEGURADORA.Infra.Data.csproj`, `VSEGURADORA.Core.csproj`, `VSEGURADORA.Apresentacao.Web.csproj`, `VSEGURADORA.Core.Tester.csproj`.

Para cada nova feature `[Nome]`, gere os seguintes artefatos **nessa ordem**:

1. **Entidade** — `VSEGURADORA.Core.Entidades/Entidades/[Nome].cs`
2. **Interface Repository** — `VSEGURADORA.Infra.Data/SIGA/Interfaces/I[Nome]Repository.cs`
3. **Implementação Repository** — `VSEGURADORA.Infra.Data/SIGA/Repository/[Nome]Repository.cs`
4. **Interface Business** — `VSEGURADORA.Core/Interfaces/I[Nome]Business.cs`
5. **Implementação Business** — `VSEGURADORA.Core/Business/[Nome]Business.cs`
6. **Adição ao SIGAContext** — `DbSet<[Nome]>` em `SIGAContext.cs`
7. **Adição ao UnitOfWork** — `case "I[Nome]Repository":` em `UnitOfWork.cs`
8. **Adição ao BusinessBase** — `case "I[Nome]Business":` em `BusinessBase.cs`
9. **ViewModel** — `VSEGURADORA.Apresentacao.Web/Models/[Nome]/[Nome]ViewModel.cs`
10. **AutoMapper** — trecho em `AutoMapperConfig.cs`
11. **Actions no [Epic]Controller** — Pesquisar, Cadastrar, Salvar, SetarInativo
12. **View Pesquisar** — `Views/[Epic]/[Nome].cshtml`
13. **View Resultado Parcial** — `Views/[Epic]/_Resultado[Nome].cshtml`
14. **View Cadastrar/Editar** — `Views/[Epic]/Create[Nome].cshtml`
15. **Adição ao Sitemap** — `Mvc.sitemap`
16. **Script SQL manual** — `VSEGURADORA.Infra.Database/[NomeMigration].sql`
17. **Teste Unitário** — `VSEGURADORA.Core.Tester/Testes/[Nome]BusinessTester.cs`

> Para os templates completos de cada artefato, leia `references/templates.md`.

---

## Instrução de Execução

### Passo 1 — Leitura e Confirmação

Ao receber o documento, extraia e confirme:

```
📋 LEITURA DO DOCUMENTO TÉCNICO
──────────────────────────────────────────
Funcionalidade: [nome]
Entidade(s):    [novas | existentes afetadas]
Tabela(s):      [exatamente como na documentação]
Epic / Controller: [Epic → [Epic]Controller]
Campos:         [quantidade] identificados
Validações:     [quantidade] mapeadas
Regras de neg.: [quantidade] identificadas
──────────────────────────────────────────
⚠️ Confirme para prosseguir.
```

### Passo 2 — Geração dos artefatos

1. Extraia nome da entidade (PascalCase), tabela (exata), campos, FKs e regras do documento.
2. Substitua todos os placeholders `[Nome]`, `[nome_tabela]`, `[nomeCamelCase]`, `[Epic]`, `[NomeAmigavel]` com os valores reais.
3. Gere **todos os 17 artefatos** em sequência, com código completo e pronto para uso.
4. Após cada novo arquivo, inclua imediatamente a instrução de registro no `.csproj`.

### Passo 3 — Validação contra a documentação

Após gerar todos os artefatos, apresentar a tabela de validação:

| Artefato | Conforme com a documentação? | Observação |
|---|---|---|
| Entidade — campos e tipos | ✅ / ❌ | |
| Entidade — nome da tabela | ✅ / ❌ | |
| Business — regras de negócio | ✅ / ❌ | |
| ViewModel — campos, labels e validações | ✅ / ❌ | |
| Controller — Epic correto, filtros e AutoMapper | ✅ / ❌ | |
| View Pesquisar — filtros conforme PO | ✅ / ❌ | |
| View Resultado — colunas conforme PO | ✅ / ❌ | |
| View Cadastrar — campos conforme PO | ✅ / ❌ | |
| Sitemap — item de menu no Epic | ✅ / ❌ | |
| Script SQL — nome da tabela e colunas | ✅ / ❌ | |

### Passo 4 — Checklist final

```
✅ CHECKLIST — [Nome da Funcionalidade]
──────────────────────────────────────────────────────
CÓDIGO (BACK-END)
 [ ] Criar [Nome].cs                    → Core.Entidades/Entidades/ + .csproj
 [ ] Criar I[Nome]Repository.cs         → Infra.Data/SIGA/Interfaces/ + .csproj
 [ ] Criar [Nome]Repository.cs          → Infra.Data/SIGA/Repository/ + .csproj
 [ ] Criar I[Nome]Business.cs           → Core/Interfaces/ + .csproj
 [ ] Criar [Nome]Business.cs            → Core/Business/ + .csproj
 [ ] Adicionar DbSet<[Nome]>            → SIGAContext.cs
 [ ] Adicionar case I[Nome]Repository    → UnitOfWork.cs
 [ ] Adicionar case I[Nome]Business      → BusinessBase.cs

FRONT-END
 [ ] Criar [Nome]ViewModel.cs          → Models/[Nome]/ + .csproj
 [ ] Adicionar mapeamento AutoMapper    → AutoMapperConfig.cs
 [ ] Adicionar actions ao [Epic]Controller.cs
 [ ] Criar [Nome].cshtml               → Views/[Epic]/  ⚠️ botão "Novo(a)" obrigatório
 [ ] Criar _Resultado[Nome].cshtml     → Views/[Epic]/  ⚠️ _Paginacao obrigatório (10/pág)
 [ ] Criar Create[Nome].cshtml         → Views/[Epic]/
 [ ] Adicionar ao Sitemap              → Mvc.sitemap (nó dentro do bloco Epic)

BANCO
 [ ] Criar [NomeMigration].sql         → VSEGURADORA.Infra.Database/
 [ ] Executar script em DEV
 [ ] Executar script em homologação

TESTES
 [ ] Criar [Nome]BusinessTester.cs     → Core.Tester/Testes/ + .csproj
 [ ] Todos os testes passando (verde)
──────────────────────────────────────────────────────
```

---

## Regras Invioláveis

- **Prefixo `tb_`:** NUNCA adicionar ao nome da tabela. Usar exatamente o nome da documentação.
- **NLog:** NUNCA usar nas classes Business. Apenas em Controllers e infraestrutura.
- **Epic Controller:** Não criar `[Nome]Controller` separado. Adicionar actions ao `[Epic]Controller`.
- **BusinessBase:** Não reimplementar `Salvar`, `Obter`, `Listar`, `Excluir` — já existem na base.
- **Paginação:** SEMPRE usar `ListarPaginado` com 10 itens por página + `_Paginacao` partial.
- **Botão "Novo":** SEMPRE presente na View de pesquisa, protegido por `ETipoAcesso.Cadastrar`.
