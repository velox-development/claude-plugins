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

### 📘 doc-de-pagina
Gera o manual do usuário a partir do documento técnico (tecnico-dev) do Confluence, linkado ao doc de PO de origem. Enriquece com screenshots reais da tela se o Claude in Chrome estiver conectado.

1. Lê o doc técnico do Confluence (por URL ou conteúdo colado) e o doc de PO vinculado
2. Captura a tela atual via Chrome — se disponível (opcional, continua sem ele)
3. Gera manual com Visão Geral, Passo a Passo e FAQ em linguagem acessível ao usuário final
4. Salva como `.md` no workspace
5. Pergunta se deseja enviar ao Google Drive da equipe

**Como usar:** Forneça a URL do doc técnico do Confluence (ou cole o conteúdo) e diga _"gera o manual do usuário"_ ou _"cria a documentação para o usuário final"_.

---

## Google Drive — Pasta Compartilhada

A skill `doc-de-pagina` oferece envio ao Drive ao final da execução. Os manuais ficam organizados na pasta compartilhada da equipe:

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
