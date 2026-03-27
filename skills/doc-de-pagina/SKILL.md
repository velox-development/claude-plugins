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
  version: "0.6.0"
---

# doc-de-pagina

Gere o manual do usuário em **PDF** a partir do documento técnico (tecnico-dev) do Confluence.
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
- **NomeFeature** — nome da funcionalidade (use para nomear o arquivo)
- **NomeModulo** — módulo/epic ao qual pertence
- **Campos** — lista de campos com tipos e obrigatoriedades
- **Regras de negócio** — validações e restrições
- **Fluxo principal** — sequência de ações do usuário final

## Passo 1b — Extrair Imagens da Documentação Técnica

Após obter o conteúdo da página técnica, procure por imagens embutidas. As imagens
da doc técnica enriquecem o manual do usuário — elas já foram validadas pelo time e
mostram a interface real do sistema, poupando o passo de captura manual.

### Listar anexos da página via API do Confluence

Use `fetchAtlassian` para buscar os anexos:

```
GET /wiki/rest/api/content/{pageId}/child/attachment?expand=version&limit=50
```

Filtre apenas os anexos com `mediaType` de imagem:
- `image/png`, `image/jpeg`, `image/gif`, `image/svg+xml`

### Classificar: incluir ou excluir no manual

Nem toda imagem técnica é adequada para o usuário final. Aplique este filtro:

| Incluir no manual | Excluir do manual |
|-------------------|-------------------|
| Screenshots de tela/interface (nomes como `tela_`, `screen_`, `captura_`) | Diagramas de arquitetura |
| Fluxos visuais de navegação | Modelos de dados (ERD) |
| Resultado esperado / estado de sucesso | Mapas de infraestrutura |
| Imagens com `_PO_`, `_usuario_`, `_manual_` no nome | Diagramas UML / sequência |

Se nenhum nome der pistas claras, inclua imagens com menos de 400 KB (provavelmente
screenshots) e exclua as maiores (provavelmente diagramas técnicos pesados).

### Baixar as imagens selecionadas

Para cada imagem aprovada, use `fetchAtlassian` com o endpoint de download do anexo:

```
GET /wiki/rest/api/content/{pageId}/child/attachment/{attachmentId}/download
```

Salve cada arquivo em `/tmp/manual_images/{nome_original}`.

Se não houver nenhuma imagem disponível, continue sem — o passo é opcional.

---

## Passo 2 — Capturar Tela (Chrome — opcional)

Se ferramentas do Claude in Chrome estiverem disponíveis nesta sessão, use-as para
capturar o texto e a tela atual. Isso permite enriquecer o manual com labels reais,
layout e botões visíveis na interface.

Se as ferramentas do Chrome não estiverem disponíveis nesta sessão, apenas ignore
este passo e continue. Não exiba mensagem de erro.

## Passo 3 — Gerar o PDF do Manual

Escreva e execute um script Python que gere o PDF usando `reportlab`.
Salve o script em `/tmp/gerar_manual.py` e execute com `python /tmp/gerar_manual.py`.

### Configuração de página e estilos

```python
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY

PAGE_W, PAGE_H = A4          # 595 x 842 pts
MARGIN = 2.0 * cm
USABLE_W = PAGE_W - 2 * MARGIN  # ~481 pts disponíveis para conteúdo

styles = getSampleStyleSheet()

# Estilos customizados
BRAND_BLUE   = colors.HexColor("#1B3A6B")
BRAND_LIGHT  = colors.HexColor("#E8EEF7")
BRAND_ACCENT = colors.HexColor("#2E6FBF")
GRAY_LINE    = colors.HexColor("#CCCCCC")

title_style = ParagraphStyle(
    "ManualTitle", parent=styles["Title"],
    fontSize=20, textColor=colors.white, alignment=TA_CENTER,
    spaceAfter=4, leading=26
)
subtitle_style = ParagraphStyle(
    "ManualSubtitle", parent=styles["Normal"],
    fontSize=10, textColor=colors.white, alignment=TA_CENTER
)
h1_style = ParagraphStyle(
    "H1", parent=styles["Heading1"],
    fontSize=13, textColor=BRAND_BLUE, spaceBefore=18, spaceAfter=6,
    borderPad=4
)
h2_style = ParagraphStyle(
    "H2", parent=styles["Heading2"],
    fontSize=11, textColor=BRAND_ACCENT, spaceBefore=12, spaceAfter=4
)
body_style = ParagraphStyle(
    "Body", parent=styles["Normal"],
    fontSize=9.5, leading=14, spaceAfter=6, alignment=TA_JUSTIFY
)
bullet_style = ParagraphStyle(
    "Bullet", parent=body_style,
    leftIndent=14, bulletIndent=4, spaceAfter=3
)
cell_style = ParagraphStyle(
    "Cell", parent=styles["Normal"],
    fontSize=8.5, leading=12, wordWrap="LTR"
)
cell_header_style = ParagraphStyle(
    "CellHeader", parent=cell_style,
    textColor=colors.white, fontName="Helvetica-Bold"
)
```

### Tabelas com texto longo — regras obrigatórias

Sempre que gerar uma tabela no PDF:

1. **Nunca passe strings cruas como células** — sempre envolva em `Paragraph(texto, cell_style)`.
   Isso garante quebra automática de linha dentro da célula.

2. **Defina larguras explícitas que somem exatamente `USABLE_W`** de acordo com o conteúdo:
   - Tabela de campos (4 colunas): `[USABLE_W*0.35, USABLE_W*0.18, USABLE_W*0.15, USABLE_W*0.32]`
     (Campo / Tipo / Obrigatório / Descrição)
   - Tabela de validações (2 colunas): `[USABLE_W*0.45, USABLE_W*0.55]`
   - Tabela de perfis (2 colunas): `[USABLE_W*0.30, USABLE_W*0.70]`

3. **TableStyle obrigatório** para todas as tabelas:
```python
TABLE_STYLE_BASE = TableStyle([
    # Cabeçalho
    ("BACKGROUND",  (0, 0), (-1, 0),  BRAND_BLUE),
    ("TEXTCOLOR",   (0, 0), (-1, 0),  colors.white),
    ("FONTNAME",    (0, 0), (-1, 0),  "Helvetica-Bold"),
    ("FONTSIZE",    (0, 0), (-1, 0),  9),
    ("TOPPADDING",  (0, 0), (-1, 0),  6),
    ("BOTTOMPADDING", (0, 0), (-1, 0), 6),
    # Linhas de dados
    ("FONTNAME",    (0, 1), (-1, -1), "Helvetica"),
    ("FONTSIZE",    (0, 1), (-1, -1), 8.5),
    ("TOPPADDING",  (0, 1), (-1, -1), 5),
    ("BOTTOMPADDING", (0, 1), (-1, -1), 5),
    ("LEFTPADDING", (0, 0), (-1, -1), 6),
    ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    # Zebra
    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BRAND_LIGHT]),
    # Bordas
    ("GRID",        (0, 0), (-1, -1), 0.5, GRAY_LINE),
    ("BOX",         (0, 0), (-1, -1), 1.0, BRAND_BLUE),
    # Alinhamento vertical
    ("VALIGN",      (0, 0), (-1, -1), "TOP"),
])
```

4. **Passe `colWidths` sempre** ao criar `Table(data, colWidths=[...], style=TABLE_STYLE_BASE, repeatRows=1)`.
   `repeatRows=1` repete o cabeçalho em caso de quebra de página.

### Capa do documento

Gere um bloco de capa usando uma tabela de 1 coluna com fundo azul escuro:

```python
def make_cover(nome_feature, nome_modulo, data_atual):
    cover_data = [[
        Paragraph(f"Manual do Usuário", title_style),
        Paragraph(nome_feature, ParagraphStyle("FN", parent=title_style, fontSize=16)),
        Spacer(1, 8),
        Paragraph(f"Módulo: {nome_modulo}  |  Versão 1.0  |  {data_atual}", subtitle_style),
        Paragraph("Elaborado por: VSeguradora — LPL Solutions", subtitle_style),
    ]]
    # Use KeepTogether para manter capa na mesma página
    t = Table([[item] for item in cover_data[0]], colWidths=[USABLE_W])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BRAND_BLUE),
        ("TOPPADDING",    (0, 0), (-1, -1), 14),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
        ("LEFTPADDING",   (0, 0), (-1, -1), 20),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 20),
        ("BOX", (0, 0), (-1, -1), 2, BRAND_ACCENT),
    ]))
    return t
```

### Inserindo imagens no PDF (quando disponíveis)

Se imagens foram baixadas no Passo 1b, insira-as no PDF usando `reportlab`:

```python
from reportlab.platypus import Image as RLImage
import os

def make_image_block(path, caption, usable_w):
    """Retorna [imagem_centralizada, legenda] prontos para o story."""
    from reportlab.platypus import KeepTogether
    img = RLImage(path, width=usable_w * 0.85, height=None)  # height=None mantém proporção
    img.hAlign = "CENTER"
    legenda = Paragraph(f"<i>{caption}</i>", ParagraphStyle(
        "Caption", parent=styles["Normal"],
        fontSize=8, textColor=colors.HexColor("#555555"),
        alignment=TA_CENTER, spaceAfter=10
    ))
    return KeepTogether([img, legenda])
```

Insira cada imagem **imediatamente após o passo que ela ilustra**, nunca ao final do documento.
A legenda deve descrever o que o usuário está vendo — ex: *"Tela de cadastro de Classe de Risco Ocupacional"*.

Se a imagem vier do Passo 2 (Chrome), use-a preferencialmente em vez da imagem da doc técnica
para a mesma tela — a captura ao vivo é mais fiel ao estado atual do sistema.

### Estrutura do documento

Monte o `story` com estas seções, na ordem:

1. Capa (tabela azul com título, módulo, versão, data, elaborado por)
2. `Spacer(1, 0.5*cm)`
3. **Seção 1 — Visão Geral**
   - `Paragraph("1. Visão Geral", h1_style)`
   - Parágrafo descrevendo o que a feature faz (linguagem do usuário final)
   - Sub-seção "Para quem é destinado" com tabela de perfis × permissões
   - Sub-seção "Pré-requisitos" com lista em bullets
4. **Seção 2 — Passo a Passo de Uso**
   - `Paragraph("2. Passo a Passo de Uso", h1_style)`
   - Passos numerados narrados como `Paragraph("1. Acesse o menu ...", body_style)`
   - **Imagens de interface** inseridas após os passos correspondentes (via `make_image_block`)
   - Tabela de campos (4 colunas: Campo / Tipo / Obrigatório / Descrição)
   - Tabela de mensagens de validação (2 colunas: Situação / Mensagem exibida)
5. **Seção 3 — Perguntas Frequentes (FAQ)**
   - `Paragraph("3. Perguntas Frequentes", h1_style)`
   - Mínimo 5 pares Q&A. Para cada par:
     - `Paragraph(f"<b>P: {pergunta}</b>", body_style)`
     - `Paragraph(f"R: {resposta}", body_style)`
     - `Spacer(1, 4)`

### Salvamento do PDF

```python
output_path = "Manuais/[NomeModulo]/Manual_[NomeFeature].pdf"

# Crie as pastas necessárias antes
import os
os.makedirs(os.path.dirname(output_path), exist_ok=True)

doc = SimpleDocTemplate(
    output_path,
    pagesize=A4,
    leftMargin=MARGIN, rightMargin=MARGIN,
    topMargin=MARGIN, bottomMargin=MARGIN,
    title=f"Manual do Usuário — [NomeFeature]",
    author="VSeguradora — LPL Solutions"
)
doc.build(story)
print(f"PDF gerado em: {output_path}")
```

Substitua `[NomeModulo]` e `[NomeFeature]` pelos valores reais extraídos no Passo 1.
O caminho de saída deve ser relativo ao workspace do usuário (pasta selecionada no Cowork).

## Passo 4 — Confirmar e Apresentar

Após gerar o PDF, apresente-o ao usuário com um link direto usando o caminho `computer://`.
Informe o caminho completo onde foi salvo.

## Passo 5 — Perguntar sobre o Drive

Após salvar, pergunte ao usuário:

> "Manual gerado em PDF e salvo em `Manuais/[NomeModulo]/Manual_[NomeFeature].pdf`.
> Deseja enviar para o Google Drive da equipe?"

**Se responder SIM:**
1. Localize ou crie a subpasta `[NomeModulo]` dentro da pasta raiz da equipe
   (ID: `1sYkqKNvvjR8b-ig6f1cd7nu4Uc6qzTDg`)
2. Faça upload do arquivo PDF gerado para essa subpasta
3. Informe o link do arquivo no Drive
4. Se Claude in Chrome estiver ativo, injete o botão flutuante usando o código em
   `references/floating-button.js` com o link do Drive

**Se responder NÃO:**
Encerre com o resumo abaixo.

## Resumo Final

```
✅ Manual gerado: [NomeFeature]
✅ Fontes: doc técnico do Confluence [+ tela Chrome, se disponível]
✅ Salvo em: Manuais/[NomeModulo]/Manual_[NomeFeature].pdf
[✅ Enviado ao Drive: link] ou [— não enviado ao Drive]
[✅ Botão flutuante injetado] ou [—]
```
