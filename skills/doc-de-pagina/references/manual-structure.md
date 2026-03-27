# Template Detalhado — Manual do Usuário VSeguradora

Este arquivo define a estrutura completa, as instruções de preenchimento e os critérios
de qualidade para cada seção do manual do usuário gerado automaticamente após o scaffold.

---

## Cabeçalho do Documento

```
Manual do Usuário — [NomeEntidade]
Módulo: [NomeModulo]
Versão: 1.0
Data: [DD/MM/AAAA]
Elaborado por: VSeguradora — LPL Solutions
```

---

## Seção 1 — Visão Geral da Feature

### 1.1 O que é

Descreva a feature em 2 a 4 parágrafos usando linguagem acessível.
Responda: *O que esse módulo permite fazer? Qual é o seu propósito no sistema?*

Exemplo de abertura:
> "O módulo de [NomeEntidade] permite ao usuário [ação principal], garantindo
> [benefício principal] de forma rápida e segura dentro do VSeguradora."

### 1.2 Para quem é destinado

Liste os perfis de usuário que utilizam esta feature:

| Perfil        | Permissões                                    |
|---------------|-----------------------------------------------|
| [Perfil 1]    | Visualizar, criar, editar                     |
| [Perfil 2]    | Somente visualizar                            |
| Administrador | Acesso total incluindo exclusão               |

Inferir os perfis a partir das regras de negócio e campos implementados. Se não for
possível inferir, usar: Usuário Padrão e Administrador.

### 1.3 Pré-requisitos

Liste o que o usuário precisa ter ou saber antes de usar esta feature:

- Estar autenticado no sistema VSeguradora
- Ter o perfil [X] associado ao seu usuário
- [Outros pré-requisitos derivados das dependências identificadas no código]

---

## Seção 2 — Passo a Passo de Uso

### Orientações de escrita

- Use **linguagem imperativa e direta**: "Clique em...", "Preencha o campo...", "Selecione..."
- **Evite jargão técnico**: não mencione nomes de classes, métodos, controllers ou views
- Cada passo deve ter no máximo 2 linhas
- Para campos obrigatórios, indique claramente: **(obrigatório)**
- Para validações, descreva o comportamento do sistema, não o código

### 2.1 Acessando a funcionalidade

Descreva como o usuário navega até a feature:

1. Acesse o sistema VSeguradora em `[URL do sistema]`
2. No menu principal, navegue até **[NomeModulo]** > **[NomeEntidade]**
3. A tela de listagem será exibida com todos os registros disponíveis

### 2.2 Criando um novo registro

1. Na tela de listagem, clique no botão **Novo [NomeEntidade]**
2. Preencha os campos do formulário:

| Campo            | Descrição                          | Obrigatório |
|------------------|------------------------------------|-------------|
| [Campo 1]        | [Descrição do campo em português]  | Sim         |
| [Campo 2]        | [Descrição do campo em português]  | Não         |

*Instrução: inferir os campos a partir da Entidade e ViewModel gerados no scaffold.*

3. Após preencher todos os campos obrigatórios, clique em **Salvar**
4. O sistema exibirá a mensagem de confirmação: *"[NomeEntidade] cadastrado com sucesso"*
5. Você será redirecionado para a tela de listagem com o novo registro visível

### 2.3 Consultando e editando um registro

1. Na tela de listagem, localize o registro desejado
2. Clique em **Detalhes** para visualizar as informações completas
3. Para editar, clique em **Editar** na tela de detalhes ou diretamente na listagem
4. Altere os campos necessários e clique em **Salvar**
5. As alterações serão refletidas imediatamente na listagem

### 2.4 Mensagens de validação mais comuns

Liste as validações implementadas no Business/ViewModel traduzidas para o usuário:

| Situação                          | Mensagem exibida                              |
|-----------------------------------|-----------------------------------------------|
| Campo obrigatório não preenchido  | "O campo [X] é obrigatório"                  |
| [Validação específica da feature] | "[Mensagem amigável correspondente]"          |

*Instrução: extrair as validações do arquivo Business e traduzir para linguagem do usuário.*

---

## Seção 3 — Perguntas Frequentes (FAQ)

### Orientações de escrita

- Mínimo de 5 perguntas, máximo de 10
- Formule as perguntas como o usuário final perguntaria (não como desenvolvedor)
- Respostas diretas, máximo de 3 parágrafos cada
- Inferir perguntas a partir de: validações, regras de negócio, campos, fluxos alternativos

### Modelo de pergunta inferida

Use os padrões abaixo para gerar as perguntas com base no código:

**A partir de validações:**
> "Por que o sistema exibe a mensagem '[mensagem de erro]'?"
> Resposta: Isso ocorre quando [explicação da regra em linguagem simples].

**A partir de campos obrigatórios:**
> "O campo [X] é sempre obrigatório?"
> Resposta: [Sim/Não]. [Explicação da regra de negócio].

**A partir de fluxos:**
> "Posso editar um [NomeEntidade] após [evento]?"
> Resposta: [Sim/Não, com explicação baseada nas regras do Business].

**A partir de permissões:**
> "Qualquer usuário pode [ação]?"
> Resposta: Apenas usuários com o perfil [X] têm permissão para [ação].

**Pergunta genérica sempre incluída:**
> "Com quem devo entrar em contato em caso de problemas?"
> Resposta: Em caso de dificuldades, entre em contato com o suporte da VSeguradora
> pelo canal interno ou com o administrador do sistema.

---

## Critérios de Qualidade

Antes de finalizar o manual, verifique:

- [ ] Nenhum nome de classe, método ou arquivo técnico aparece no texto
- [ ] Todos os campos obrigatórios da Entidade estão documentados na Seção 2
- [ ] As mensagens de validação do Business estão refletidas na Seção 2.4
- [ ] O FAQ tem pelo menos 5 perguntas pertinentes ao contexto da feature
- [ ] O tom é consistente (formal, acessível, sem gírias)
- [ ] Os campos da tabela da Seção 2.2 batem com o ViewModel gerado

### Critérios de Qualidade para Imagens

- [ ] Todas as imagens inseridas são de interface do usuário (nenhum diagrama técnico)
- [ ] Cada imagem está posicionada imediatamente após o passo que ela ilustra
- [ ] Todas as imagens têm legenda descritiva em português
- [ ] Imagens com dados sensíveis ou usuários internos foram substituídas por capturas sanitizadas
- [ ] A resolução é suficiente para leitura no PDF (sem pixelização visível)
- [ ] Imagens do Chrome (Passo 2) foram usadas em preferência às da doc técnica quando disponíveis
