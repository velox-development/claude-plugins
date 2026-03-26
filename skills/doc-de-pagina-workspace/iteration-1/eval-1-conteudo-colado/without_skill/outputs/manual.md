# Manual do Usuário — Apólices VSeguradora

## Visão Geral

O módulo de **Apólices** permite que você crie e gerencie apólices de seguros na plataforma VSeguradora. Uma apólice é o contrato que formaliza o acordo entre a seguradora e o cliente segurado.

### Quem pode usar?
- Corretores de seguros
- Administradores do sistema

Se você não conseguir acessar o módulo de Apólices, verifique se tem o perfil correto com seu administrador.

---

## Passo a Passo — Criar uma Nova Apólice

### Passo 1: Acessar o Menu de Apólices

1. Faça login na plataforma VSeguradora
2. No menu principal, clique em **Apólices**
3. Você será direcionado para a tela de gerenciamento de apólices

### Passo 2: Iniciar Criação da Apólice

1. Clique no botão **Nova Apólice** (geralmente localizado no canto superior direito)
2. Uma tela de formulário será aberta

### Passo 3: Preencher os Dados da Apólice

Você precisará preencher os seguintes campos obrigatórios:

| Campo | Descrição | Formato |
|-------|-----------|---------|
| **Número da Apólice** | Identificador único da apólice | Texto (ex: APO-2024-001234) |
| **Data de Início** | Quando a apólice começa a vigorar | Data (DD/MM/AAAA) |
| **Data de Fim** | Quando a apólice encerra | Data (DD/MM/AAAA) |
| **Valor do Prêmio** | Valor que o segurado pagará | Valor em reais (ex: 1.500,00) |
| **Segurado** | Selecione o cliente que será segurado | Busca/dropdown |

**Dicas importantes:**
- O **Número da Apólice** deve ser único — não é possível ter duas apólices com o mesmo número
- A **Data de Fim** deve ser sempre posterior à **Data de Início**
- O **Valor do Prêmio** deve ser maior que zero
- Para selecionar o **Segurado**, você pode digitar o nome ou CPF do cliente

### Passo 4: Validação e Confirmação

1. Após preencher todos os dados, clique em **Salvar**
2. O sistema validará os dados automaticamente
3. Se houver algum erro (campo faltante, datas inválidas, etc.), uma mensagem de erro aparecerá indicando o problema
4. Corrija os dados conforme necessário
5. Após validação bem-sucedida, uma mensagem de confirmação será exibida
6. A apólice será criada e adicionada ao sistema

---

## Perguntas Frequentes (FAQ)

### P: Qual é a diferença entre Data de Início e Data de Fim?

**R:** A **Data de Início** é quando o contrato de seguro começa a proteger o cliente. A **Data de Fim** é quando o contrato encerra. Por exemplo, uma apólice pode começar em 01/01/2024 e terminar em 31/12/2024, cobrindo um ano inteiro.

### P: O que acontece se eu usar um número de apólice que já existe?

**R:** O sistema não permitirá salvar a apólice. Você receberá um aviso de que o número já está em uso. Escolha um número diferente e tente novamente.

### P: Posso usar um valor de prêmio igual a zero?

**R:** Não. O sistema exige que o valor do prêmio seja maior que zero. Isso garante que todas as apólices têm um valor contratado.

### P: O que significa o campo "Ativo"?

**R:** Este é um status que indica se a apólice está ativa (em vigência) ou inativa. A apólice fica ativa automaticamente quando criada e pode ser desativada quando necessário (por exemplo, quando encerra).

### P: Consigo editar uma apólice após criá-la?

**R:** Esta funcionalidade pode variar conforme as configurações de sua conta. Consulte seu administrador sobre as permissões de edição de apólices já criadas.

### P: Posso realmente criar uma apólice se não for Corretor ou Administrador?

**R:** Não. Apenas usuários com os perfis **Corretor** ou **Administrador** têm permissão para criar apólices. Se você precisa dessa funcionalidade, solicite ao administrador que atualize seu perfil.

### P: E se eu errar a Data de Fim (colocar uma data anterior à Data de Início)?

**R:** O sistema rejeitará a apólice. Uma mensagem de erro informará que a Data de Fim deve ser posterior à Data de Início. Verifique as datas e tente novamente.

### P: Onde posso encontrar as apólices que criei?

**R:** Após criar a apólice, ela aparecerá na lista de apólices do módulo. Você pode usar a busca para localizar apólices pelo número ou pelo nome do segurado.

### P: Preciso confirmar a apólice após salvar?

**R:** Não. Uma vez que o sistema valida e confirma a criação, a apólice já está registrada no sistema. Você receberá uma mensagem confirmando que tudo foi salvo com sucesso.

---

## Resumo do Fluxo

```
Acessar Apólices → Nova Apólice → Preencher Dados → Validação → Confirmação → Apólice Criada
```

---

## Suporte

Caso tenha dúvidas ou enfrente problemas ao criar apólices, entre em contato com o suporte técnico ou com seu administrador VSeguradora.

**Versão do Manual:** 1.0
**Data:** Março de 2026
