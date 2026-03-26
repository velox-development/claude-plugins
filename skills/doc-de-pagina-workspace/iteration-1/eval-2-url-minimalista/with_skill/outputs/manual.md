# Manual do Usuário — Cadastro de Veículo

**Módulo:** Veículos | **Versão:** 1.0 | **Data:** 26 de março de 2026
**Elaborado por:** VSeguradora — LPL Solutions

---

## 1. Visão Geral

O módulo **Cadastro de Veículo** permite que você registre e mantenha um controle completo sobre os veículos associados aos proprietários no sistema VSeguradora. Esta funcionalidade é essencial para processos de cotação, emissão de apólices e gestão de sinistros.

### Para quem é destinado?
- Operadores de atendimento
- Gerentes de contas
- Gestores de frota
- Proprietários de veículos

### Pré-requisitos de acesso
- Permissão de acesso ao módulo Veículos
- Identificação válida do proprietário do veículo no sistema
- Dados do veículo em mãos (documentação do RENAVAM/Placa)

---

## 2. Passo a Passo de Uso

### Acesso ao Formulário

1. Na tela inicial do VSeguradora, localize o menu **Veículos** no painel lateral ou menu principal
2. Clique em **Novo Veículo**
3. Um formulário em branco será exibido com os campos a serem preenchidos

### Preenchimento dos Campos

A tabela a seguir descreve cada campo do formulário:

| Campo | Tipo | Obrigatório? | Descrição | Formato/Exemplos |
|-------|------|--------------|-----------|------------------|
| **Placa** | Texto | Sim | Placa de identificação do veículo | AAA-0000 ou AAA0A00<br/>(ex: ABC-1234 ou ABC1D23) |
| **Modelo** | Texto | Sim | Modelo do veículo | Honda Civic, Ford Fiesta, Toyota Corolla |
| **Ano** | Número | Sim | Ano de fabricação do veículo | Entre 1900 e o ano atual (ex: 2022) |
| **Cor** | Texto | Não | Cor predominante do veículo | Branco, Preto, Prata, Azul, Vermelho, etc. |
| **Chassi** | Texto | Sim | Número do chassi (VIN) do veículo | Deve ser único no sistema (17 caracteres) |
| **ID Proprietário** | Número | Sim | Identificador do proprietário no sistema | Número de registro do cliente (ex: 5432) |

### Procedimento Completo

#### Etapa 1: Informações Básicas
1. Digite a **Placa** no formato correto (AAA-0000 ou AAA0A00)
   - Sistema validará automaticamente o formato
   - Se o formato estiver incorreto, uma mensagem de erro será exibida

2. Insira o **Modelo** do veículo (marca e modelo)
   - Digite o nome exato ou selecione de uma lista de sugestões

3. Informe o **Ano** de fabricação
   - Selecione o ano através de um seletor de data ou digite manualmente
   - O sistema não permitirá anos futuros

#### Etapa 2: Informações Adicionais
4. Preencha a **Cor** do veículo (opcional)
   - Campo de texto livre ou seleção em lista

5. Digite o **Chassi** (número VIN)
   - Este número deve ser único — o sistema rejeitará se já existir outro veículo com o mesmo chassi
   - Sempre válide com a documentação do veículo

#### Etapa 3: Proprietário
6. Informe o **ID Proprietário**
   - Digite o número de identificação do proprietário cadastrado no sistema
   - Certifique-se de que o proprietário existe antes de salvar

#### Etapa 4: Salvar
7. Após preencher todos os campos obrigatórios, clique no botão **Salvar**
8. O sistema validará todas as informações
9. Se tudo estiver correto, a mensagem "Veículo cadastrado com sucesso" será exibida
10. Você será redirecionado para a lista de veículos ou para a ficha do veículo

### Mensagens de Validação

| Situação | Mensagem | O que fazer |
|----------|----------|-------------|
| Placa inválida | "Formato de placa inválido. Use AAA-0000 ou AAA0A00" | Verifique a placa e digite novamente |
| Ano futuro | "Ano não pode ser maior que o ano atual" | Selecione um ano válido |
| Chassi duplicado | "Este chassi já está registrado no sistema" | Verifique se é um novo veículo ou se confundiu o número |
| Campo obrigatório vazio | "[Nome do campo] é obrigatório" | Preencha todos os campos marcados com * |
| Proprietário não existe | "Proprietário não encontrado no sistema" | Verifique o ID do proprietário |

---

## 3. FAQ — Perguntas Frequentes

### 1. Qual é o formato correto da placa?
**R:** O sistema aceita dois formatos:
- Placas antigas: **AAA-0000** (3 letras, hífen, 4 números)
- Placas Mercosul: **AAA0A00** (3 letras, 1 número, 1 letra, 2 números)

Exemplos válidos: ABC-1234, ABC1D23

### 2. Posso cadastrar um veículo com ano futuro?
**R:** Não. O sistema bloqueia automaticamente qualquer ano posterior ao ano atual. Isso garante a precisão dos dados. Verifique a data de fabricação no documento do RENAVAM.

### 3. O que é o número do Chassi (VIN)?
**R:** O Chassi, também chamado VIN (Vehicle Identification Number), é um código único de 17 caracteres que identifica cada veículo. Você encontra esse número:
- No RENAVAM
- No certificado de propriedade
- Na lateral inferior do para-brisa (canto esquerdo)

O sistema não permite dois veículos com o mesmo chassi, portanto sempre verifique antes de cadastrar.

### 4. Posso deixar o campo "Cor" em branco?
**R:** Sim. A cor é o único campo opcional. Todos os outros campos (Placa, Modelo, Ano, Chassi, ID Proprietário) são obrigatórios e devem ser preenchidos.

### 5. O que faço se receber a mensagem "Chassi já está registrado"?
**R:** Isso significa que existe outro veículo cadastrado com o mesmo número de chassi. Verifique:
- Se o número foi copiado corretamente do documento
- Se não é uma duplicação acidental de um cadastro anterior
- Se é realmente um veículo novo ou uma atualização de uma ficha existente

Se for atualizar dados de um veículo já cadastrado, localize-o na lista e edite seus dados em vez de criar um novo registro.

### 6. Como localizar o ID Proprietário?
**R:** O ID Proprietário é o número de registro do cliente no sistema VSeguradora. Você pode encontrá-lo:
- Na ficha de cadastro do proprietário
- No contrato ou apólice existente
- Usando a função de busca de clientes no menu principal
- Na documentação entregue ao cliente

Se não encontrar o ID, cadastre o proprietário primeiro no módulo de Clientes.

---

## 4. Próximos Passos

Após cadastrar o veículo com sucesso:
- O veículo ficará disponível para cotações e emissão de apólices
- Você poderá associar coberturas específicas ao veículo
- O histórico de sinistros pode ser consultado na ficha do veículo
- Os dados podem ser atualizados a qualquer momento editando a ficha existente

---

**Dúvidas?** Consulte o suporte em [suporte@vseguradora.com.br](mailto:suporte@vseguradora.com.br) ou acione o time de operações.
