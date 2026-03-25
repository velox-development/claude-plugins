# VSeguradora Dev Tools

Plugin de produtividade para desenvolvimento no projeto **VSeguradora** (ASP.NET MVC 5 / Web API 2 / .NET Framework 4.6.1).

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

## Stack suportada

- ASP.NET MVC 5 / Web API 2 / .NET Framework 4.6.1
- EF6 Code-First, Unity DI, NLog, AutoMapper, Moq
- Arquitetura N-Tier: Apresentacao.Web → Core → Infra.Data → SQL Server
