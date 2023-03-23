# Especificações do Projeto

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

Celcio é um contador de 40 anos. Começou a trabalhar desde jovem, mas nunca teve nenhum conhecimento de organização pessoal financeira. Já passou por muitas dificuldades desde jovem por não ter tido interesse em realizar seus planejamentos monetários pessoais. Atualmente, após ter conseguido uma família, está procurando melhorar seus hábitos consumistas realizando listas de compras e definindo um orçamento mensal.

Maurício, 27 anos, é formado, casado, atua na área da programação e tem o perfil de investidor conservador (não lida bem com riscos e perdas). Ele já pensa em sua aposentadoria e tem um plano de investimentos que possibilitará que se aposente com 40 anos. Embora a planilha Excel atenta a suas necessidades, Maurício sente necessidade de algo mais intuitivo e simples pra organizar suas listas de compras.

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

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Consumista          | Controlar meus gastos              | Me organizar financeiramente           |
|Administrador       | Alterar permissões                 | Permitir que possam administrar contas |

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

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
|RF-001| Permitir que o usuário cadastre tarefas | ALTA |  |
|RF-002| Emitir um relatório de tarefas no mês   | MÉDIA | |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                            |
|--|-------------------------------------------------------|
|01| O projeto será entregue até o final do semestre       |
|02| Não pode ser desenvolvido um módulo de backend        |
|03| FrontEnd desenvolvido em HTML5 e JavaScript           |
|04| Grupo de desenvolvimento deste projeto é composto por 5 pessoas|

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
