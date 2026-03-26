# Manual do Usuário - Cadastro de Veículos

## Visão Geral

Este manual orienta você através do processo de cadastramento de novos veículos no sistema VSeguradora. O módulo de Veículos permite registrar informações completas sobre cada veículo, incluindo dados técnicos e identificação.

---

## Campos do Cadastro

### Campos Obrigatórios

| Campo | Tipo | Descrição |
|-------|------|-----------|
| **Placa** | String | Identificação única do veículo. Deve seguir o formato de placa válido (ex: ABC-1234 ou ABC1D23) |
| **Modelo** | String | Nome ou código do modelo do veículo (ex: Gol, Civic, Onix) |
| **Ano** | Inteiro | Ano de fabricação do veículo. Não pode ser um ano futuro |
| **Chassi** | String | Número do chassi do veículo. Deve ser único no sistema e não pode ser repetido |

### Campos Opcionais

| Campo | Tipo | Descrição |
|-------|------|-----------|
| **Cor** | String | Cor do veículo (ex: Preto, Branco, Prata) |

---

## Regras de Validação

Ao preencher o formulário de cadastro, observe as seguintes regras:

1. **Placa**: Deve ter um formato válido. O sistema aceitará formatos padrão de placas brasileiras:
   - Formato antigo: ABC-1234
   - Formato Mercosul: ABC1D23

2. **Ano**: Não pode ser igual ou superior ao ano atual. O sistema rejeitará anos futuros automaticamente.

3. **Chassi**: Cada número de chassi deve ser único na base de dados. Se o chassi já estiver cadastrado, o sistema exibirá um aviso de duplicação.

4. **Placa, Modelo e Ano**: São campos obrigatórios e devem ser preenchidos antes de salvar.

---

## Passo a Passo - Como Cadastrar um Veículo

### Passo 1: Acessar o Módulo de Veículos

1. No menu principal, clique em **Veículos**
2. Você será direcionado para a tela de gerenciamento de veículos

### Passo 2: Iniciar um Novo Cadastro

1. Clique no botão **Novo Veículo**
2. Um formulário em branco será exibido

### Passo 3: Preencher os Dados

Complete todos os campos obrigatórios:

- **Placa**: Insira a placa do veículo no formato correto
- **Modelo**: Insira o modelo do veículo
- **Ano**: Insira o ano de fabricação
- **Chassi**: Insira o número do chassi (deve ser único)

Opcionalmente, preencha:

- **Cor**: Insira a cor do veículo

### Passo 4: Validar os Dados

Antes de clicar em Salvar, o sistema pode exibir avisos ou erros se:

- A placa não estiver no formato correto
- O ano for futuro
- O chassi já existir no sistema
- Faltarem preenchimentos em campos obrigatórios

Corrija qualquer problema identificado.

### Passo 5: Salvar o Cadastro

1. Clique no botão **Salvar**
2. Se todos os dados estiverem corretos, o veículo será cadastrado com sucesso
3. Uma mensagem de confirmação será exibida
4. Você será redirecionado para a lista de veículos

---

## Mensagens de Erro Comuns

### "Placa inválida"
- **Causa**: A placa não está no formato esperado
- **Solução**: Verifique o formato e digite novamente (ABC-1234 ou ABC1D23)

### "Ano não pode ser futuro"
- **Causa**: Você inseriu um ano maior que o ano atual
- **Solução**: Digite um ano válido, igual ou anterior ao ano atual

### "Chassi já existe"
- **Causa**: Este número de chassi já foi cadastrado no sistema
- **Solução**: Verifique se o veículo não foi cadastrado anteriormente ou insira um chassi diferente

### "Campo obrigatório não preenchido"
- **Causa**: Um ou mais campos obrigatórios (Placa, Modelo, Ano ou Chassi) estão vazios
- **Solução**: Preencha todos os campos marcados como obrigatórios

---

## Boas Práticas

1. **Dupla Verificação**: Antes de salvar, verifique se todos os dados foram digitados corretamente
2. **Formato de Placa**: Consulte o RENAVAN ou documento do veículo para garantir o formato correto
3. **Número do Chassi**: Este é um identificador único; guarde-o em um local seguro
4. **Atualização de Dados**: Se precisar corrigir informações após o cadastro, acesse o veículo na lista e clique em "Editar"

---

## Suporte

Se encontrar dificuldades ou erros não listados neste manual:

- Verifique se todos os dados foram preenchidos corretamente
- Tente novamente após alguns momentos
- Entre em contato com o suporte técnico da VSeguradora

---

*Manual gerado com conteúdo fictício (fallback) - Acesso ao Confluence não foi possível*
*Última atualização: 26 de março de 2026*
