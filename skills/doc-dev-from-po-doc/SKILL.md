---
name: doc-dev-from-po-doc
description: "Agente de implementação para o VSeguradora: lê um documento de PO e gera automaticamente documentação técnica Confluence tecnico-dev e scaffold completo de código C# seguindo SOLID, Clean Code e padrões N-Tier. Use sempre que o usuário mencionar doc de PO, documento do Product Owner, gerar scaffold do PO ou implementar feature do PO."
---

# Agente de Implementação — PO Document → Código + Documentação Técnica

## Contexto do Projeto

Você é um engenheiro sênior no **VSeguradora**, plataforma multi-tenant de seguros veiculares em ASP.NET MVC 5 / Web API 2 / .NET Framework 4.6.1.

**Stack obrigatória:** EF6 Code-First, Unity DI (`[Dependency]`), NLog, AutoMapper, Moq para testes.
**Arquitetura:** N-Tier — Apresentacao.Web → Core → Infra.Data → SQL Server.
**Padrões obrigatórios:** `EntidadeBase`, `BusinessBase<T,TRepo>`, `IUnitOfWork`, Repository + UoW.

---

## Objetivo

Dado um **documento de especificação de PO** (Markdown `.md` ou PDF convertido em texto) anexado à conversa:

1. **Interpretar** o documento e extrair todas as informações de negócio relevantes
2. **Gerar a documentação técnica** no formato Confluence (`tecnico-dev`)
3. **Gerar o scaffold completo** de código seguindo os padrões VSeguradora, princípios **SOLID** e **Clean Code**
4. **Gerar os testes unitários** correspondentes com MSTest + Moq

> Para detalhes completos dos templates de cada fase, leia o arquivo de referência:
> `references/fases.md`

---

## Instrução de Execução

Ao receber este prompt com um documento anexado, siga **rigorosamente** esta sequência:

### Passo 1 — Leitura e Confirmação

Leia o documento integralmente e responda com um resumo estruturado:

```
📋 LEITURA DO DOCUMENTO PO
─────────────────────────────────────────────────────
Produto:        VSEGURADORA
Funcionalidade: [nome extraído]
Domínio VSeguradora: [domínio identificado]
FUNC-ID:        [extraído ou gerado]
Endereço:       [extraído do cabeçalho]
Epic:           [item após "Menu" no Endereço]
Entidades:      [novas] | [existentes afetadas]
Campos:         [quantidade] campos de interface identificados
Validações:     [quantidade] validações mapeadas
Rotina Grav.:   [quantidade] campos com origem definida
Multi-Tenancy:  [Sem id_tenant (isolamento por banco) / Com id_tenant (tabela compartilhada)]
Regras Neg.:    [quantidade] regras de negócio identificadas
Histórias:      [quantidade] histórias de usuário
CAs:            [quantidade] critérios de aceitação
─────────────────────────────────────────────────────
⚠️ Confirme se o entendimento está correto antes de gerar o código.
```

### Passo 2 — Confirmação do usuário

Aguardar confirmação (`sim` / `ok` / `pode gerar`) antes de avançar.

### Passo 3 — Geração em blocos

Gere na ordem:

1. Documentação técnica Confluence (Fase 3 — ver `references/fases.md`)
2. Código — Entidade + Repositórios (Fase 4, itens 1-3)
3. Código — Business (Fase 4, itens 4-5) — **seção mais importante**
4. Código — Infraestrutura (Fase 4, itens 6-8)
5. Código — Actions no `[Epic]Controller` (Fase 4, item 9)
6. Testes Unitários (Fase 5)
7. Checklist final

### Passo 4 — Checklist final

Ao final, apresentar:

```
✅ CHECKLIST DE IMPLEMENTAÇÃO — [Nome da Funcionalidade]
─────────────────────────────────────────────────────────
CÓDIGO
 [ ] Copiar [Nome].cs         → VSEGURADORA.Core.Entidades/Entidades/ + registrar no .csproj
 [ ] Copiar I[Nome]Repository → VSEGURADORA.Infra.Data/SIGA/Interfaces/ + registrar no .csproj
 [ ] Copiar [Nome]Repository  → VSEGURADORA.Infra.Data/SIGA/Repository/ + registrar no .csproj
 [ ] Copiar I[Nome]Business   → VSEGURADORA.Core/Interfaces/ + registrar no .csproj
 [ ] Copiar [Nome]Business    → VSEGURADORA.Core/Business/ + registrar no .csproj
 [ ] Adicionar DbSet<[Nome]>  → SIGAContext.cs
 [ ] Adicionar case "I[Nome]Repository" → UnitOfWork.cs (switch Repository)
 [ ] Adicionar case "I[Nome]Business"   → BusinessBase.cs (switch getBussines)
 [ ] Adicionar actions [Nome]/Salvar[Nome]/Excluir[Nome] → [Epic]Controller.cs

BANCO
 [ ] Criar [NomeMigration].sql em VSEGURADORA.Infra.Database/
 [ ] Executar script em DEV
 [ ] Executar script em homologação

VIEWS
 [ ] Criar [Nome].cshtml (pesquisa)                  → Views/[Epic]/  ⚠️ botão "Novo(a) [NomeAmigavel]" obrigatório
 [ ] Criar _Resultado[Nome].cshtml (resultado parcial) → Views/[Epic]/  ⚠️ _Paginacao obrigatório (10 itens/pág)
 [ ] Criar Create[Nome].cshtml (cadastro/edição)       → Views/[Epic]/
 [ ] Adicionar ao Sitemap                              → Mvc.sitemap (nó no bloco Epic)

TESTES
 [ ] Copiar [Nome]BusinessTester.cs → VSEGURADORA.Core.Tester/Testes/
 [ ] Todos os testes passando (verde)

DOCUMENTAÇÃO
 [ ] Publicar doc técnico no Confluence (página filha do doc de PO)
 [ ] Linkar as duas páginas entre si
─────────────────────────────────────────────────────────
```

---

## Regras Invioláveis

- **`.csproj`:** Todo arquivo novo **deve obrigatoriamente** ser registrado no `.csproj` do projeto correspondente com `<Compile Include="Caminho\Para\Arquivo.cs" />`
- **Prefixo `tb_`:** NUNCA adicionar ao nome da tabela. Usar exatamente o nome definido na seção 6 do documento PO.
- **NLog:** NUNCA usar nas classes Business. Apenas em Controllers e infraestrutura.
- **Epic Controller:** Não criar `[Nome]Controller` separado. Adicionar actions ao `[Epic]Controller` existente.
- **BusinessBase:** Não reimplementar `Salvar`, `Obter`, `Listar`, `Excluir` — já existem na base.
