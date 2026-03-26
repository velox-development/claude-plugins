# Manual do Usuário — Apólice

**Módulo:** Gestão de Apólices | **Versão:** 1.0 | **Data:** 26 de março de 2026

**Elaborado por:** VSeguradora — LPL Solutions

---

## 1. Visão Geral

A funcionalidade **Apólice** permite criar, gerenciar e acompanhar apólices de seguros no sistema VSeguradora. Uma apólice é o documento que formaliza o contrato entre a seguradora e o segurado, definindo as condições, o período de cobertura e o valor do prêmio.

### Para Quem é Esta Funcionalidade?

- **Corretores de Seguros** — podem criar e gerenciar apólices para seus clientes
- **Administradores do Sistema** — têm acesso total para gerenciar todas as apólices

### Pré-requisitos de Acesso

Você precisa estar logado com uma das funções acima e ter acesso ao módulo de Gestão de Apólices.

---

## 2. Passo a Passo de Uso

### Como Criar uma Nova Apólice

#### 1. Acesse o Menu de Apólices
Na tela inicial do sistema, localize e clique em **Apólices** no menu principal.

#### 2. Crie uma Nova Apólice
Clique no botão **Nova Apólice**.

#### 3. Preencha o Formulário
A tela de cadastro abrirá com os seguintes campos:

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| **Número da Apólice** | Texto | Sim | Identificação única da apólice no sistema. Não pode haver duas apólices com o mesmo número. |
| **Data de Início** | Data | Sim | Data em que a cobertura do seguro começa. |
| **Data de Fim** | Data | Sim | Data em que a cobertura do seguro termina. Deve ser posterior à Data de Início. |
| **Valor do Prêmio** | Decimal (R$) | Sim | Valor que o segurado pagará pelo seguro. Deve ser maior que zero. |
| **Ativo** | Sim/Não | Não | Define se a apólice está ativa ou inativa no sistema. Padrão: Sim |
| **Segurado** | Seleção | Sim | Selecione o cliente (segurado) para o qual esta apólice é destinada. |

**Exemplo de preenchimento:**
```
Número da Apólice:     AP-2026-001234
Data de Início:        01/03/2026
Data de Fim:           01/03/2027
Valor do Prêmio:       R$ 1.500,00
Ativo:                 Sim
Segurado:              João da Silva (ID: 5481)
```

#### 4. Revise os Dados
Antes de salvar, verifique se todos os dados estão corretos, especialmente:
- O número da apólice é único (nenhum outro registro com este número)
- A data de fim é posterior à data de início
- O valor do prêmio é positivo
- O segurado correto foi selecionado

#### 5. Salve a Apólice
Clique em **Salvar**. O sistema validará todas as regras de negócio e:
- Se tudo estiver correto, a apólice será criada e você verá uma mensagem de confirmação
- Se houver erro, uma mensagem explicará o que precisa ser corrigido

### Mensagens de Validação

| Mensagem | Significado | O Que Fazer |
|----------|-------------|-----------|
| "Data de fim deve ser posterior à data de início" | A data de encerramento é anterior ou igual à de início | Corrija a Data de Fim para uma data posterior à Data de Início |
| "Valor do prêmio deve ser maior que zero" | O valor inserido é zero ou negativo | Digite um valor positivo para o prêmio |
| "Número da apólice já existe no sistema" | Já existe outra apólice com este número | Escolha um número único para a nova apólice |
| "Apenas corretores e administradores podem criar apólices" | Seu perfil não tem permissão | Entre em contato com um administrador se achar que deveria ter acesso |
| "Apólice criada com sucesso!" | A apólice foi salva corretamente | A apólice está pronta para uso |

---

## 3. Perguntas Frequentes (FAQ)

**P: Qual é a diferença entre "Data de Início" e "Data de Fim"?**

R: A Data de Início é quando o seguro começa a vigorar e o cliente passa a ter cobertura. A Data de Fim é quando o seguro expira. O período entre essas datas é a vigência da apólice.

---

**P: Posso criar uma apólice com datas iguais (início e fim no mesmo dia)?**

R: Não. O sistema não permite. A Data de Fim deve ser sempre posterior à Data de Início. Isso garante que a apólice tenha pelo menos um período de cobertura.

---

**P: E se eu não tiver um segurado cadastrado ainda? Posso criar a apólice sem ele?**

R: Não. O campo Segurado é obrigatório. Se o cliente ainda não está no sistema, peça a um administrador para cadastrá-lo primeiro no módulo de Segurados, depois você poderá criar a apólice.

---

**P: Posso criar uma apólice com valor do prêmio de R$ 0,00?**

R: Não. O valor do prêmio deve ser sempre maior que zero. Se for um caso especial, consulte um administrador sobre opções alternativas.

---

**P: O que significa o campo "Ativo"? Posso deixar em branco?**

R: O campo "Ativo" determina se a apólice está ativa (em vigor) ou inativa (desativada) no sistema. Você não precisa preencher manualmente — por padrão, toda apólice criada já começa como "Ativa". Se precisar desativar depois, isso pode ser feito durante a edição da apólice.

---

**P: Posso alterar o número da apólice depois de criada?**

R: Cada número de apólice é único e identifica o contrato. Recomenda-se não alterar após criação. Se precisar de uma alteração crítica, consulte um administrador.

---

**P: Quem pode criar apólices no sistema?**

R: Apenas usuários com perfil de **Corretor de Seguros** ou **Administrador** podem criar apólices. Se você não conseguir acessar a função, verifique seu perfil ou solicite permissão a um administrador.

---

**P: O que acontece se eu clicar em Salvar com um campo obrigatório vazio?**

R: O sistema não permitirá salvar. Uma mensagem aparecerá indicando qual campo está faltando, e você poderá preenchê-lo antes de tentar novamente.

---

## 4. Resumo

A funcionalidade de Apólice facilita o gerenciamento de contratos de seguros:

- ✅ Cadastro rápido com validações automáticas
- ✅ Garante consistência de dados (datas coerentes, valores válidos)
- ✅ Vincula o seguro ao segurado correto
- ✅ Mantém histórico de apólices ativas e inativas

Para mais dúvidas, consulte o time de suporte ou a documentação adicional da VSeguradora.

---

**Versão:** 1.0 | **Última atualização:** 26 de março de 2026

