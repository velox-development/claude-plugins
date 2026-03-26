# VSeguradora Dev Tools

Plugin de produtividade para desenvolvimento no projeto **VSeguradora** (ASP.NET MVC 5 / Web API 2 / .NET Framework 4.6.1).

> **Auto-atualização:** Este plugin possui um hook de `SessionStart` que executa `git pull` automaticamente a cada abertura do Claude. Toda atualização feita no repositório é distribuída para o time sem nenhuma ação manual.

## Skills disponíveis

### 📄 doc-dev-from-po-doc
Lê um documento de PO (Product Owner) e gera automaticamente:
- Documentação técnica no formato Confluence (`tecnico-dev`)
- Scaffold completo de código C# seguindo SOLID, Clean Code e os padrões N-Tier do projeto

**Como usar:** Anexe um doc de PO à conversa e diga _"gera o scaffold a partir deste doc de PO"_.

---

### 🏗️ dev-new-feature
Dado um documento de especificação técnica (Confluence `tecnico-dev`), gera todos os **17 artefatos** necessários para uma nova feature:

1. Entidade (EF6 Code-First)
2. Interface Repository
3. Implementação Repository
4. Interface Business
5. Implementação Business
6. Adição ao SIGAContext
7. Adição ao UnitOfWork
8. Adição ao BusinessBase
9. ViewModel
10. AutoMapper
11. Actions no Epic Controller
12. View Pesquisar (Razor)
13. View Resultado Parcial (Razor)
14. View Cadastrar/Editar (Razor)
15. Adição ao Sitemap
16. Script SQL manual
17. Teste Unitário (MSTest + Moq)

**Como usar:** Anexe o doc técnico e diga _"gera o scaffold da feature"_.

---

### 🏗️📘 dev-feature-com-manual
Igual ao `dev-new-feature`, mas com geração automática de documentação ao final. Após concluir os 17 artefatos, executa automaticamente:
1. Geração do manual do usuário (Visão Geral, Passo a Passo, FAQ)
2. Upload no Google Drive na pasta compartilhada da equipe (`VSeguradora > [Módulo]`)
3. Injeção de botão flutuante na tela com link para o manual

**Como usar:** Anexe o doc técnico e diga _"implementa a feature com manual"_ ou _"gera o scaffold com documentação"_.

---

### 📘 doc-de-pagina
Gera o manual do usuário a partir de uma tela já aberta no navegador (via Claude in Chrome). Não precisa de código ou especificação — lê diretamente o que está na tela.
1. Captura e analisa a página atual (campos, botões, validações, fluxos)
2. Gera o manual do usuário com Visão Geral, Passo a Passo e FAQ
3. Publica no Google Drive na pasta compartilhada da equipe
4. Injeta botão flutuante na tela com link para o manual

**Como usar:** Com a tela do VSeguradora aberta no navegador, diga _"gera a documentação da página atual"_ ou _"cria o manual desta tela"_.

---

## Google Drive — Pasta Compartilhada

As skills `dev-feature-com-manual` e `doc-de-pagina` salvam os manuais na pasta compartilhada da equipe:

```
Pasta compartilhada (ID: 1sYkqKNvvjR8b-ig6f1cd7nu4Uc6qzTDg)
└── [Módulo]/
    └── Manual do Usuário — [Feature].gdoc
```

Para usar, ative o conector **Google Drive** nas configurações do Claude e garanta que todos os membros da equipe têm permissão de edição na pasta.

## Stack suportada

- ASP.NET MVC 5 / Web API 2 / .NET Framework 4.6.1
- EF6 Code-First, Unity DI, NLog, AutoMapper, Moq
- Arquitetura N-Tier: Apresentacao.Web → Core → Infra.Data → SQL Server
