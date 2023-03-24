# Especificações do Projeto

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

Celcio é um contador de 40 anos. Começou a trabalhar desde jovem, mas nunca teve nenhum conhecimento de organização pessoal financeira. Já passou por muitas dificuldades desde jovem por não ter tido interesse em realizar seus planejamentos monetários pessoais. Atualmente, após ter conseguido uma família, está procurando melhorar seus hábitos consumistas realizando listas de compras e definindo um orçamento mensal.

José, 27 anos, é formado, casado, atua na área da programação e tem o perfil de investidor conservador (não lida bem com riscos e perdas). Ele já pensa em sua aposentadoria e tem um plano de investimentos que possibilitará que se aposente com 40 anos. Embora a planilha Excel atenta a suas necessidades, Maurício sente necessidade de algo mais intuitivo e simples pra organizar suas listas de compras.

Camila é uma mulher de 39 anos, professora do município, solteira, apaixonada por seus gatos de estimação que tem TOC (transtorno obsessivo compulsivo). Sua obsessão é por organização, ela não consegue trabalhar ou fazer qualquer atividade de lazer se alguma coisa em sua casa está por fazer. Aos fazer compras, Camila usava o sistema de informação de caderninho e caneta pra fazer suas listas antes de sair de casa, mas fazer isso tomava muito tempo, e muitos caderninhos e canetas foram usados, gerando mais despesas que poderiam ser substituídas por uma solução Web.

Cristiane tem 19 anos, mora com os pais, acabou de entrar na Universidade, para cursar a Faculdade de Engenharia, em outra cidade. Tem algumas economias e seus pais controlavam suas finanças. Agora com esta possibilidade de morar em outra cidade, tenta aprender como controlar suas finanças para conseguir realizar seu sonho de se formar e conseguir se manter sem passar nenhuma dificuldade financeira.

Neusa tem 45 anos, dona de casa, tem diversas tarefas de arrumação, limpeza do lar, zelo com os filhos e a administração doméstica. Como dona do lar, ela precisa de um organizador para cuidar das finanças pessoais que inclui os cuidados com as despesas domésticas, fazer pequenas modificações no dia a dia, seja modificando seus hábitos de consumo, economizando água, energia ou alimentos, esses novos cuidados colaborarão na obtenção de maior economia doméstica.

Alex tem 24 anos, é um promissor professor de educação física, muito requisitado em todas as academias de sua cidade. O jovem desde pequeno nunca se deu bem com números e nunca ligou muito para seus gastos, tendo o hábito de comprar tudo o que deseja, satisfazendo seus desejos imediatos com compras e mais compras, não se importando com a quantidade de parcelas ou como arcaria com as despesas. Recentemente recebeu uma mensagem do banco que seus cartões haviam estourado e já não havia mais limite no cheque especial. O homem agora busca uma forma prática e intuitiva para se organizar e conseguir quitar esse endividamento.

Alisson é um garoto de 13 anos que está ganhando uma mesada por mês de seus avós, embora muito jovem ele quer administrar bem o seu dinheiro entre lanches na escola e juntar o restante pra trocar de celular no fim do ano.



> **Links Úteis**:
> - [Rock Content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de Empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de Stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
Lembre-se que você deve ser enumerar e descrever precisamente e personalizada todos os clientes ideais que sua solução almeja.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`                            | QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                      |
|------------------------------------------------|------------------------------------|---------------------------------------------|
|Consumista                                      | Controlar meus gastos              | Me organizar financeiramente                |
|Investidor Conservador                          | Lista de compras                   | Evitar perdas e gerenciar gastos mensais    |
|Pessoa com TOC em organização                   | Uma solução WEB                    | Organizar Lista de compras                  |
|Iniciante em finanças                           | Controlar as finanças e gastos     | Controle fianceiro de forma simples         | 
|Dona de Casa                                    | Controle dos gastos domésticos     | Proteger o orçamento familiar               |  
|Pessoa Endividada                               | Registrar e organizar dividas      | Evitar e quitar divídas                     |
|Jovem aprendendo a administar seu dinheiro      | De um site simples e intuitivo     | Administar o dinheiro para trocar de celular|
                     




> **Links Úteis**:  
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade | Responsável |
|------|-----------------------------------------|----| ----|
|RF-001| Permitir que o usuário cadastre Lista de gastos mensais | ALTA |  |
|RF-002| Extrato com demonstrativo dos gastos por tipo (Lazer, Alimentação, etc.)   | ALTA | |
|RF-003| Permitir a visualização em modo escuro | MÉDIA |  |
|RF-004| Personalização da Lista de despesas por necessidade do Usuário   | MÉDIA | |
|RF-005| Emitir um gráfico com despesas do mês | BAIXA |  |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| Adaptável a qualquer interface - Browser, Smartphone ou Tablet | ALTA | 
|RNF-002| A página deverá ter disponibilidade em 100% do tempo |  ALTA | 
|RNF-003| Utilização de Senha para bloqueio – Sistema de Segurança/Privacidade | ALTA | 
|RNF-004| Tempo de resposta de até a 3s para solicitação ao usuário |  MÉDIA |

## Restrições

O desenvolvimento do projeto será restrito pelos itens apresentados na seguinte tabela:

|ID| Restrição                                            |
|--|-------------------------------------------------------|
|01| O projeto será entregue até o final do semestre       |
|02| Não pode ser desenvolvido um módulo de backend        |
|03| FrontEnd desenvolvido em HTML5 e JavaScript           |
|04| Grupo de desenvolvimento deste projeto é composto por 5 pessoas|

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
