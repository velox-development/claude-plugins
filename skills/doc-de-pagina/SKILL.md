---
name: doc-de-pagina
description: >
  Use esta skill sempre que o usuário quiser gerar um manual do usuário de uma feature do
  VSeguradora. Gatilhos principais: mensagem contendo uma URL do Confluence + qualquer pedido
  de manual/documentação, "gera manual do usuário", "cria documentação do usuário final",
  "gera o manual desta feature", "documenta para o usuário final", "cria manual a partir
  do doc técnico", "manual do usuário do Confluence". Também use quando o usuário fornecer
  apenas um link do Confluence e pedir documentação — o link sozinho já é sinal suficiente.
metadata:
  version: "0.5.0"
---

# doc-de-pagina

Gere o manual do usuário a partir do documento técnico (tecnico-dev) do Confluence.
Screenshots via Chrome são opcionais — use se disponível, continue sem caso contrário.
Ao final, pergunte se o usuário quer enviar para o Google Drive.

## Passo 1 — Obter o Documento Técnico

**Opção A — URL do Confluence fornecida na mensagem:**
Use o conector Atlassian disponível nesta sessão para buscar o conteúdo da página.
O ID da página geralmente aparece na URL como `/pages/XXXXXX/Nome-da-Pagina` — use esse
número como identificador. Se a página contiver links para um doc de PO de origem,
busque também esse documento para enriquecer o contexto de regras de negócio.

**Opção B — Conteúdo colado diretamente na conversa:**
Use o texto já presente no contexto — não é necessária nenhuma chamada externa.

Após obter o conteúdo, extraia:
- **NomeFeature** — nome da funcionalidade
- **NomeModulo** — módulo/epic ao qual pertence
- **Campos** — lista de campos com tipos e obrigatoriedades
- **Regras de negócio** — validações e restrições
- **Fluxo principal** — sequência de ações do usuário final

## Passo 2 — Capturar Tela (Chrome — opcional)

Se ferramentas do Claude in Chrome estiverem disponíveis nesta sessão, use-as para
capturar o texto e a tela atual. Isso permite enriquecer o manual com labels reais,
layout e botões visíveis na interface.

Se as ferramentas do Chrome não estiverem disponíveis nesta sessão, apenas ignore
este passo e continue. Não exiba mensagem de erro.

## Passo 3 — Gerar o Manual

Produza o manual completo seguindo a estrutura detalhada em `references/manual-structure.md`.

**Cabeçalho:**
```
Manual do Usuário — [NomeFeature]
Módulo: [NomeModulo] | Versão: 1.0 | Data: [data atual]
Elaborado por: VSeguradora — LPL Solutions
```

**Seções obrigatórias:**
1. **Visão Geral** — o que a feature faz, para quem é destinada, pré-requisitos de acesso
2. **Passo a Passo de Uso** — fluxo narrado em linguagem do usuário final, tabela de campos
   (label visível, tipo, obrigatório), mensagens de validação em linguagem simples
3. **FAQ** — mínimo 5 perguntas inferidas das regras de negócio e campos identificados

Linguagem acessível — sem nomes de classes, métodos, arquivos ou termos técnicos de código.

## Passo 4 — Salvar Localmente

Salve o manual como arquivo Markdown no workspace:
- Caminho: `Manuais/[NomeModulo]/Manual_[NomeFeature].md`

Crie a pasta se não existir.

## Passo 5 — Perguntar sobre o Drive

Após salvar, pergunte ao usuário:

> "Manual gerado e salvo em `Manuais/[NomeModulo]/Manual_[NomeFeature].md`.
> Deseja enviar para o Google Drive da equipe?"

**Se responder SIM:**
1. Localize ou crie a subpasta `[NomeModulo]` dentro da pasta raiz da equipe
   (ID: `1sYkqKNvvjR8b-ig6f1cd7nu4Uc6qzTDg`)
2. Crie o Google Doc com o conteúdo do manual
3. Informe o link do documento criado
4. Se Claude in Chrome estiver ativo, injete o botão flutuante usando o código em
   `references/floating-button.js` com o link do Drive

**Se responder NÃO:**
Encerre com o resumo abaixo.

## Resumo Final

```
✅ Manual gerado: [NomeFeature]
✅ Fontes: doc técnico do Confluence [+ tela Chrome, se disponível]
✅ Salvo em: Manuais/[NomeModulo]/Manual_[NomeFeature].md
[✅ Enviado ao Drive: link] ou [— não enviado ao Drive]
[✅ Botão flutuante injetado] ou [—]
```
