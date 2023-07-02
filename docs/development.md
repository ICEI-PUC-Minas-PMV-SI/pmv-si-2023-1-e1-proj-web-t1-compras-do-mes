# Programação de Funcionalidades

Nesta etapa descrevemos os artefatos e estruturas de dados desenvolvidos para atender os requisitos previstos nas Especificações do Projeto. As tecnologias utilizadas se baseiam nas linguagens HTML, CSS e JavaScript.

## Requisitos Atendidos

A seguir, apresentamos as tabelas que demosntram os requisitos funcionais e não-funcionais que relacionam o escopo do projeto com os artefatos criados:

### Requisitos Funcionais

|ID    | Descrição do Requisito | Prioridade | Artefato Criado |
|------|------------------------|------------|-----------------|
|RF-001| Permitir que o usuário cadastre uma lista de gastos mensais | ALTA |  lista-de-gastos.html |  
|RF-002| Permitir que o usuário cadastre seus gastos por categorias (Lazer, Alimentação, etc.)   | ALTA | lista-de-gastos.html | 
|RF-003| Emitir um alerta de excedente de gasto   | ALTA |lista-de-gastos.html  | 
|RF-004| Permitir que o usuário defina uma meta de orçamento mensal | ALTA |lista-de-gastos.html   |
|RF-005| Personalização da lista de despesas por necessidade do usuário   | MÉDIA |lista-de-gastos.html  |
|RF-006| Emitir um gráfico com os gastos por tipos de despesas | BAIXA |lista-de-gastos.html   |

### Requisitos não Funcionais

|ID    | Descrição do Requisito | Prioridade | Artefato Criado |
|------|------------------------|------------|-----------------|
|RNF-001| Adaptável a qualquer interface - Browser, Smartphone ou Tablet | ALTA | |
|RNF-002| A página deverá ter disponibilidade em 99% do tempo |  ALTA | |
|RNF-003| Utilização de Senha para bloqueio – Sistema de Segurança/Privacidade | ALTA | |
|RNF-004| Tempo de resposta de até a 3s para solicitação ao usuário |  MÉDIA | |
|RNF-005| Permitir a visualização em modo escuro | MÉDIA |  |

## Descrição das estruturas:

## Registro do Usuário
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Id Usuário     | Numero (Inteiro)  | Cadastro de Usuário                       | 1                                              |
| Nome           | Texto             | Cadastrar Usuário                         | Cowboy Top                                     |
| Senha          | Texto             | Cadastrar Senha do usuário                | 1234                                           |
| Status da conta do Uusário  | Texto  | Efetivação do Cadastro | Cadastro realizado! Realize seu login!                          |

## Realização do Login
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Id Usuário     | Numero (Inteiro)  | Preencher Tela de Login                   | 2                                             |
| Nome           | Texto             | Informar Usuário                          | Cowboy Top                                     |
| Senha          | Texto             | Informar Senha do usuário                 | 1234                                           |
| Acesso a Plataforma  | Texto       | Realização do Acesso                      | Seja bem vindo(a)!                    |

## Registro do Orçamento do Mês
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Id Usuário     | Numero (Inteiro)  | Identificador Único do Usuário            | 3                                              |
| Tipo de entrada | Numero (Inteiro) | Usuário realiza a entrada de dados da receita do Mês                          | 5000       |

## Registro do Gasto no Mês
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Id Usuário     | Numero (Inteiro)  | Identificador único do usuári                | 4                                           |
| Tipo de entrada  | Texto           | Categoria do Gasto a ser informado (Habitação, Alimentação, Lazer, Saúde, Transporte e Diversos)   | Lazer           |
| Produto        | Texto             | Nome da despesa dado pelo usuário            | Cinema                                      |
| Valor          | Numero (Inteiro)  | Valor da despesa adicionada                  | 15                                          |
| Quantidade     | Numero (Inteiro)  | Quantidade das despesas adicionadas          | 2                                           |

