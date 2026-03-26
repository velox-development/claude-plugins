# Manual do Usuário - Cadastro de Segurado

## Visão Geral

Este manual descreve o processo de cadastro de um novo segurado no sistema VSeguradora. O módulo de Cadastro permite que você registre informações de clientes que desejam contratar serviços de seguro.

---

## Acessando o Módulo de Cadastro

1. Faça login no sistema VSeguradora
2. No menu principal, clique em **Cadastro**
3. Selecione a opção **Novo Segurado**

---

## Formulário de Cadastro de Segurado

### Campos Obrigatórios

Os campos abaixo devem ser preenchidos para que o cadastro seja realizado com sucesso:

#### 1. Nome do Segurado
- **Tipo:** Texto (até 255 caracteres)
- **Descrição:** Insira o nome completo do segurado
- **Exemplo:** João Silva Santos
- **Observação:** Campo obrigatório

#### 2. CPF
- **Tipo:** Texto (formato: XXX.XXX.XXX-XX)
- **Descrição:** Insira o CPF válido do segurado
- **Validação:** O sistema valida automaticamente o CPF. Apenas CPFs válidos serão aceitos
- **Exemplo:** 123.456.789-10
- **Observação:** Campo obrigatório

#### 3. Data de Nascimento
- **Tipo:** Data (formato: DD/MM/AAAA)
- **Descrição:** Insira a data de nascimento do segurado
- **Exemplo:** 15/06/1985
- **Observação:** Campo obrigatório

### Campos Opcionais

Os campos abaixo são opcionais e podem ser preenchidos conforme necessário:

#### 4. Telefone
- **Tipo:** Texto (formato sugerido: (XX) XXXXX-XXXX)
- **Descrição:** Insira o telefone de contato do segurado
- **Exemplo:** (11) 98765-4321
- **Observação:** Campo opcional

#### 5. Email
- **Tipo:** Texto
- **Descrição:** Insira o endereço de email do segurado
- **Validação:** O sistema valida automaticamente o formato de email
- **Exemplo:** joao.silva@example.com
- **Observação:** Campo opcional, mas se preenchido deve estar em formato válido

---

## Regras de Validação

Antes de salvar o cadastro, observe as seguintes regras:

### CPF
- O CPF deve ser válido (o sistema faz validação automática)
- Não são aceitos CPFs duplicados no sistema
- O CPF é um identificador único do segurado

### Email
- O email, quando fornecido, deve estar em formato correto (exemplo@dominio.com)
- Recomenda-se sempre preencher este campo para correspondência futura

### Idade Mínima
- **Restrição importante:** O segurado deve ter no mínimo 18 anos de idade
- O sistema calcula automaticamente a idade baseado na data de nascimento
- Menores de 18 anos não podem ser cadastrados como segurados

---

## Passo a Passo para Cadastrar um Novo Segurado

### Etapa 1: Acessar o Formulário
1. No menu lateral esquerdo, selecione **Cadastro**
2. Clique em **Novo Segurado**
3. O formulário de cadastro será exibido

### Etapa 2: Preencher Dados Obrigatórios
1. No campo **Nome do Segurado**, insira o nome completo
2. No campo **CPF**, insira um CPF válido no formato XXX.XXX.XXX-XX
3. No campo **Data de Nascimento**, insira a data no formato DD/MM/AAAA
4. Verifique se a idade calculada é de pelo menos 18 anos

### Etapa 3: Preencher Dados Opcionais (Opcional)
1. Se disponível, insira o **Telefone** de contato
2. Se desejado, insira o **Email** para correspondência
3. Verifique se os dados foram formatados corretamente

### Etapa 4: Validar e Salvar
1. Revise todos os dados preenchidos
2. Clique no botão **Salvar**
3. O sistema irá validar os dados conforme as regras descritas acima
4. Se todos os dados forem válidos, o segurado será cadastrado com sucesso
5. Uma mensagem de confirmação será exibida

---

## Mensagens de Erro Comuns

| Mensagem de Erro | Causa Provável | Solução |
|---|---|---|
| "CPF inválido" | O CPF inserido não é válido | Verifique o CPF e insira um válido |
| "CPF já cadastrado" | O CPF já existe no sistema | Use um CPF diferente ou verifique se o segurado já existe |
| "Email em formato incorreto" | O email não segue o formato padrão | Use o formato exemplo@dominio.com |
| "Data de nascimento obrigatória" | O campo de data não foi preenchido | Insira a data de nascimento |
| "Segurado menor de 18 anos" | A data de nascimento indica idade inferior a 18 anos | Insira uma data de nascimento válida para um maior de idade |
| "Campo obrigatório não preenchido" | Um dos campos obrigatórios está vazio | Verifique e preencha todos os campos marcados como obrigatórios |

---

## Após Salvar o Cadastro

Depois de salvar com sucesso um novo segurado:

1. O sistema exibirá a mensagem "Cadastro realizado com sucesso"
2. O segurado receberá um ID único de identificação
3. O segurado poderá agora contratar produtos de seguro
4. Você será redirecionado para a listagem de segurados ou poderá continuar cadastrando novos segurados

---

## Dicas Úteis

- **Backup de dados:** Sempre mantenha uma cópia das informações do segurado antes de inserir no sistema
- **Formatação:** Use a formatação sugerida para CPF e email para evitar erros
- **Validação prévia:** Verifique se o segurado é maior de 18 anos antes de iniciar o cadastro
- **Contato:** Em caso de dúvidas, entre em contato com o suporte técnico

---

## Suporte e Contato

Caso tenha dúvidas ou encontre problemas durante o cadastro:

- **Email de suporte:** suporte@vseguradora.com.br
- **Telefone:** (XX) XXXX-XXXX
- **Horário de atendimento:** Segunda a sexta, 08:00 às 18:00

---

**Versão do Manual:** 1.0
**Data de Atualização:** 26 de março de 2026
**Módulo:** Cadastro
**Feature:** Cadastro de Segurado
