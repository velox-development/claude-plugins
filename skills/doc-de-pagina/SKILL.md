---
name: doc-de-pagina
description: >
  Esta skill deve ser usada quando o usuário pedir para "gerar documentação da página atual",
  "criar manual desta tela", "documentar esta funcionalidade", "gerar manual do que está
  aberto no navegador", "criar doc da página selecionada" ou qualquer variação que implique
  em gerar um manual do usuário a partir do conteúdo de uma tela já aberta no sistema.
  Lê a página atual via Claude in Chrome, gera o manual, faz upload no Google Drive e
  injeta um botão flutuante na tela com o link para o manual.
metadata:
  version: "0.1.0"
  requires: Claude in Chrome, Google Drive connector
---

# doc-de-pagina

Gere a documentação do usuário a partir de uma página já aberta no navegador, publique
no Google Drive e injete um botão flutuante de acesso rápido na própria tela.

## Fase 1 — Leitura da Página

Use as ferramentas do **Claude in Chrome** para capturar o conteúdo da página atual.

1. Capture o conteúdo completo da página com `get_page_text`
2. Faça uma leitura visual com `read_page` (screenshot) para entender a estrutura
3. Extraia os seguintes metadados da página:

   | Metadado         | Como identificar                                          |
   |------------------|-----------------------------------------------------------|
   | **NomeFeature**  | Título da página, breadcrumb ou cabeçalho H1              |
   | **NomeModulo**   | Menu ativo, breadcrumb de nível superior ou URL           |
   | **DescricaoFeature** | Subtítulo, descrição visível ou inferência do conteúdo |
   | **URL da página**| URL atual do navegador                                    |

4. Se algum metadado não puder ser identificado, pergunte ao usuário antes de prosseguir.

## Fase 2 — Análise do Conteúdo

Com base no texto e screenshot capturados, mapeie:

- **Campos de formulário**: nome, tipo (texto, select, checkbox), label visível, obrigatoriedade (indicada por * ou validação detectada)
- **Botões e ações disponíveis**: Salvar, Editar, Excluir, Buscar, Exportar etc.
- **Tabelas e listas**: colunas exibidas, ações por linha
- **Mensagens e alertas**: validações, confirmações, erros visíveis
- **Filtros e pesquisas**: campos de busca e seus critérios
- **Fluxos detectados**: abas, steps, modais, redirecionamentos

Consulte `references/manual-structure.md` para o template de cada seção do manual.

## Fase 3 — Geração do Manual

Monte o manual completo com base na análise da Fase 2:

**Título**: `Manual do Usuário — [NomeFeature]`
**Subtítulo**: `Módulo: [NomeModulo] | Versão: 1.0 | Data: [data atual]`

**Seção 1 — Visão Geral**
- O que a tela permite fazer
- Para quem é destinada (infira pelos campos e ações disponíveis)
- Pré-requisitos para acessá-la

**Seção 2 — Passo a Passo de Uso**
- Descreva cada ação principal sequencialmente
- Para cada campo identificado, explique em linguagem do usuário
- Inclua tabela de campos obrigatórios vs. opcionais
- Descreva os comportamentos de validação observados

**Seção 3 — FAQ**
- Gere mínimo 5 perguntas com base nos campos, validações e ações mapeados
- Perguntas na voz do usuário final, sem jargão técnico

Mantenha linguagem acessível — sem termos de código, nomes de classes ou métodos.

## Fase 4 — Upload no Google Drive

Use as ferramentas do conector **Google Drive** (já integrado ao Claude) para publicar o manual.

> **Pasta compartilhada da equipe** — ID fixo: `1sYkqKNvvjR8b-ig6f1cd7nu4Uc6qzTDg`
> Sempre salve nesta pasta. Não crie estruturas alternativas por conta do usuário logado.

Estrutura de pastas:
```
[Pasta compartilhada — ID: 1sYkqKNvvjR8b-ig6f1cd7nu4Uc6qzTDg]/
└── [NomeModulo]/
    └── Manual do Usuário — [NomeFeature].gdoc
```

1. **Localizar ou criar a subpasta do módulo** dentro da pasta compartilhada:
   - Busque: `name = '[NomeModulo]' and '1sYkqKNvvjR8b-ig6f1cd7nu4Uc6qzTDg' in parents and mimeType = 'application/vnd.google-apps.folder'`
   - Se não existir, crie com `parents: ['1sYkqKNvvjR8b-ig6f1cd7nu4Uc6qzTDg']`
2. **Criar o Google Doc** na subpasta do módulo:
   - `mimeType = 'application/vnd.google-apps.document'`
   - Nome: `Manual do Usuário — [NomeFeature]`
   - Parent: ID da subpasta do módulo
3. Capture o **link compartilhável** do documento — será usado na Fase 5

Em caso de falha no Drive, salve localmente em `Manuais/[NomeModulo]/Manual_[NomeFeature].md`
e informe o usuário para fazer o upload manualmente na pasta compartilhada.

## Fase 5 — Injeção do Botão Flutuante

Após obter o link do Drive, injete o botão flutuante na página usando `javascript_tool`
do Claude in Chrome.

Consulte `references/floating-button.js` para o código completo do botão.

Execute o seguinte script substituindo `DRIVE_LINK_AQUI` pelo link real do documento:

```javascript
(function injectManualButton(driveUrl) {
  // Remove instância anterior se existir
  const existing = document.getElementById('vseg-manual-btn');
  if (existing) existing.remove();

  // Cria o botão
  const btn = document.createElement('div');
  btn.id = 'vseg-manual-btn';
  btn.innerHTML = `
    <a href="${driveUrl}" target="_blank" title="Abrir Manual do Usuário" style="
      display:flex; align-items:center; gap:8px;
      text-decoration:none; color:#fff;
    ">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1
                 20 20V8L14 2Z" fill="white"/>
        <path d="M14 2V8H20" stroke="white" stroke-width="1.5"/>
        <path d="M8 13H16M8 17H13" stroke="#1a73e8" stroke-width="1.5"
              stroke-linecap="round"/>
      </svg>
      <span style="font-size:13px; font-weight:600; white-space:nowrap;">
        Manual do Usuário
      </span>
    </a>
  `;

  Object.assign(btn.style, {
    position: 'fixed',
    bottom: '24px',
    left: '24px',
    zIndex: '99999',
    background: 'linear-gradient(135deg, #1a73e8, #0d47a1)',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: '28px',
    boxShadow: '0 4px 16px rgba(26,115,232,0.45)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
    userSelect: 'none',
  });

  btn.onmouseenter = () => {
    btn.style.transform = 'scale(1.06)';
    btn.style.boxShadow = '0 6px 20px rgba(26,115,232,0.6)';
  };
  btn.onmouseleave = () => {
    btn.style.transform = 'scale(1)';
    btn.style.boxShadow = '0 4px 16px rgba(26,115,232,0.45)';
  };

  document.body.appendChild(btn);
  console.log('[VSeguradora] Botão Manual do Usuário injetado:', driveUrl);
})('DRIVE_LINK_AQUI');
```

Confirme a injeção fazendo um screenshot com `read_page` para validar que o botão
apareceu no canto inferior esquerdo da tela.

## Encerramento

Exiba o resumo final:

```
✅ Página analisada: [URL]
✅ Manual gerado — 3 seções ([N] palavras)
✅ Publicado no Drive: [link do documento]
   📁 VSeguradora > Manuais > [NomeModulo] > Manual do Usuário — [NomeFeature]
✅ Botão flutuante injetado na tela
```

Informe também o link do Drive para que o usuário possa compartilhá-lo com outros.
