# Programação de Funcionalidades

Nesta etapa descrevemos os artefatos e estruturas de dados desenvolvidos para atender os requisitos previstos nas Especificações do Projeto. As tecnologias utilizadas se baseiam nas linguagens HTML, CSS e JavaScript.

## Requisitos Atendidos

A seguir, apresentamos as tabelas que demosntram os requisitos funcionais e não-funcionais que relacionam o escopo do projeto com os artefatos criados:

### Requisitos Funcionais

|ID    | Descrição do Requisito | Prioridade | Artefato Criado |
|------|------------------------|------------|-----------------|
|RF-001| Permitir que o usuário cadastre uma lista de gastos mensais | ALTA |  |
|RF-002| Permitir que o usuário cadastre seus gastos por categorias (Lazer, Alimentação, etc.)   | ALTA | |
|RF-003| Emitir um alerta de excedente de gasto   | ALTA | |
|RF-004| Permitir que o usuário defina uma meta de orçamento mensal | ALTA |  |
|RF-005| Personalização da lista de despesas por necessidade do usuário   | MÉDIA | |
|RF-006| Emitir um gráfico com os gastos por tipos de despesas | BAIXA |  |

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

