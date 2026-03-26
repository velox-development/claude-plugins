---
name: doc-de-pagina
description: >
  Esta skill deve ser usada quando o usuário quiser gerar o manual do usuário de uma
  funcionalidade do VSeguradora a partir de um documento técnico (tecnico-dev do Confluence,
  linkado ao doc de PO). Gatilhos: "gera manual do usuário", "cria a documentação do usuário",
  "gera o manual desta feature", "documenta para o usuário final", "cria manual a partir
  do doc técnico", "gera doc de usuário do Confluence".
metadata:
  version: "0.4.0"
---

# doc-de-pagina

Gere o manual do usuário a partir do documento técnico (tecnico-dev) do Confluence.
O Chrome é opcional — se estiver conectado, captura screenshots da tela real para
enriquecer o manual. Ao final, pergunta se o usuário quer enviar para o Google Drive.

## Passo 1 — Obter o Documento Técnico

Localize o documento técnico de duas formas possíveis:

**A — URL ou ID do Confluence fornecido:**
Use `mcp__2cfbfefe-e976-4065-9122-bdc3223bb1b7__getConfluencePage` para buscar o conteúdo.
Se o documento tiver links para o doc de PO de origem, busque também o PO para contexto adicional
de regras de negócio usando `mcp__2cfbfefe-e976-4065-9122-bdc3223bb1b7__getConfluencePage`.

**B — Conteúdo colado diretamente na conversa:**
Use o texto já presente no contexto.

Extraia do documento técnico:
- **NomeFeature** — nome da funcionalidade
- **NomeModulo** — módulo/epic ao qual pertence
- **Entidade e campos** — campos da entidade com tipos e obrigatoriedades
- **Regras de negócio** — validações, restrições, comportamentos esperados
- **Fluxo principal** — sequência de ações do usuário

## Passo 2 — Capturar Tela (se Claude in Chrome disponível)

Tente usar `mcp__Claude_in_Chrome__get_page_text` e `mcp__Claude_in_Chrome__read_page`.

- Se **funcionar**: capture o texto e o screenshot da tela atual. Use os dados visuais
  (labels reais, layout, botões visíveis) para complementar e corrigir o que foi extraído
  do documento técnico.
- Se **não funcionar ou não estiver conectado**: prossiga normalmente usando apenas o
  documento técnico. Não exiba erro — apenas siga em frente.

## Passo 3 — Gerar o Manual

Produza o manual completo seguindo `references/manual-structure.md`.

**Título:** `Manual do Usuário — [NomeFeature]`
**Subtítulo:** `Módulo: [NomeModulo] | Versão: 1.0 | Data: [data atual]`

Seções obrigatórias:
1. **Visão Geral** — o que a feature faz, para quem é destinada, pré-requisitos de acesso
2. **Passo a Passo de Uso** — fluxo principal narrado em linguagem do usuário final,
   tabela de campos (label visível, tipo, obrigatório), mensagens de validação traduzidas
   para linguagem simples
3. **FAQ** — mínimo 5 perguntas inferidas das regras de negócio e campos identificados

Linguagem acessível — sem nomes de classes, métodos, arquivos ou termos técnicos de código.

## Passo 4 — Salvar Localmente

Salve o manual como arquivo Markdown no workspace:
- Caminho: `Manuais/[NomeModulo]/Manual_[NomeFeature].md`

Crie a pasta se não existir. Informe o caminho ao usuário.

## Passo 5 — Perguntar sobre o Drive

Após salvar, pergunte ao usuário:

> "Manual gerado e salvo em `Manuais/[NomeModulo]/Manual_[NomeFeature].md`.
> Deseja enviar para o Google Drive da equipe?"

**Se responder SIM:**
1. Localize ou crie a subpasta `[NomeModulo]` dentro da pasta raiz da equipe
   (ID: `1sYkqKNvvjR8b-ig6f1cd7nu4Uc6qzTDg`)
2. Crie o Google Doc com o conteúdo do manual
3. Informe o link do documento criado
4. Se Claude in Chrome estiver ativo, injete o botão flutuante via `mcp__Claude_in_Chrome__javascript_tool`
   usando o código em `references/floating-button.js` com o link do Drive

**Se responder NÃO:**
Encerre com o resumo abaixo.

## Resumo Final

```
✅ Fontes usadas: [doc técnico Confluence] [+ tela Chrome, se disponível]
✅ Manual salvo: Manuais/[NomeModulo]/Manual_[NomeFeature].md
[✅ Enviado ao Drive: link] ou [— não enviado]
[✅ Botão flutuante injetado] ou [—]
```
