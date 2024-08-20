Documentação do Sistema de Aplicativo de Escola de Esportes
1.	Introdução 
1.1 Visão Geral O sistema de aplicativo para escola de esportes é uma solução integrada que permite o gerenciamento eficiente de alunos e professores através de um aplicativo móvel e uma plataforma de gerenciamento na intranet. Este documento detalha as funcionalidades, arquitetura, requisitos e procedimentos operacionais do sistema.
1.2 Objetivo O objetivo deste sistema é fornecer uma forma mais fácil e prática para cadastrar presenças e gerenciar atividades esportivas usando o aplicativo móvel.
1.3 Escopo O sistema abrange:
o	Aplicativo móvel para cadastro de alunos e professores.
o	Sistema de gerenciamento na intranet.
o	Relatórios e análises de desempenho.

2.	Funcionalidades do Sistema 
 2.1 Aplicativo Móvel para Alunos e Professores
o	Gerenciamento de Atividades: Visualização de atividades atribuídas, com detalhes de horário e local.
2.2 Sistema de Gerenciamento na Intranet
o	Painel de Controle: Visão geral das atividades e presenças dos alunos e professores em tempo real.
o	Monitoramento de Presenças: Rastreamento em tempo real da presença dos alunos e professores nas atividades.
o	Relatórios e Análise: Geração de relatórios de desempenho, frequência e eficiência das atividades.

3.	Arquitetura do Sistema 
3.1 Visão Geral O sistema é composto por dois componentes principais: o aplicativo móvel e o sistema de gerenciamento na intranet. Ambos os componentes se comunicam através de APIs RESTful, garantindo a sincronização de dados em tempo real.
3.2 Diagrama de Arquitetura

Smartphone → Aplicativo de Alunos e Treinadores → API RESTful → Servidor de Aplicação → Servidor de Banco de Dados
              ↕                                        
    Servidor de Banco de Dados
              ↕                                                                                
 Computadores → Plataforma de Gerenciamento na Intranet → API RESTful → Servidor de Aplicação → Servidor de Banco de Dados
Servidor de Aplicação: http://vps53476.publiccloud.com.br/
Servidor de Intermediário para SSL: http:/vitalimodas.com.br/API
Servidor de Banco de Dados: http://192.168.156.150:81/index/aplicativos.html

3.3 Componentes Principais
o	Servidor de Aplicações: Hospeda as APIs e lógica de negócios.
o	Banco de Dados: Armazena todas as informações relacionadas a alunos, professores e atividades.
o	Aplicativo Móvel: Interface de usuário para alunos e professores.
o	Interface Web: Plataforma de gerenciamento acessível via navegador.

4.	Requisitos do Sistema 
4.1 Requisitos Funcionais
o	O sistema deve permitir o cadastro e autenticação dos professores.
o	O sistema deve permitir a atribuição de atividades e monitoramento em tempo real.
o	O sistema deve gerar relatórios periódicos de desempenho e frequência.

5.	Procedimentos Operacionais 
5.1 Instalação do Sistema
o	Passo 1: Instalar o Aplicativo no celular dos professores.
o	Passo 2: Criar um usuário para cada professor na intranet.
o	Passo 3: Realizar treinamento para professores.
5.2 Atualizações do Sistema
o	Backup: Realizar backup completo antes de qualquer atualização.
o	Deploy: Fazer o deploy das atualizações no servidor de aplicações.
o	Testes: Realizar testes de regressão para garantir a integridade do sistema.
5.3 Suporte e Manutenção
o	Suporte Técnico: Diego, RAMAL 224

6.	Segurança 
6.1 Autenticação e Autorização
o	Autenticação de Usuários: Realizada via Login e Senha.
o	Controle de Acesso: Diferentes níveis de acesso para professores e administradores.
6.2 Criptografia
o	Criptografia Inexistente

7.	Considerações Finais 
Este documento deve ser atualizado conforme o sistema evolui. As mudanças devem ser aprovadas pelo time de desenvolvimento e pela gerência de operações.

8.	Documentação para Desenvolvedores 
8.1 Visão Geral do Desenvolvimento Este sistema foi desenvolvido para proporcionar uma solução eficiente de gerenciamento de alunos e treinadores, integrando um aplicativo móvel com uma plataforma de gerenciamento na intranet. A arquitetura é baseada em uma comunicação via APIs RESTful entre os diferentes componentes, garantindo escalabilidade e flexibilidade para futuras expansões.



8.2 Tecnologias Utilizadas
o	Frontend Mobile: Desenvolvido em Ionic com Angular, para garantir um design responsivo e uma experiência de usuário intuitiva.
o	Backend: Construído em PHP utilizando as APIs correspondentes:


	Horaios/
	Busca.php
	Registros/
	Adicionar_registros.php
	Apagar_alunos_registros.php
	Buscar_registros.php
	Deletar_registros.php
	Verificar_registros.php
	Turmas/
	Busca.php
	Usuarios/
	Login.php

o	Banco de Dados: MySQL para armazenar informações.
o	Plataforma Web: Utiliza PHP junto com Bootstrap para a interface de gerenciamento na intranet.
8.3 Estrutura de Pastas do Projeto no IONIC
o	AplicativoEsportes
	/src
	/app
	/conferir: Página para realizar conferencia dos lançamentos.
	/home: Página de login.
	/principal: Página inicial após o login.
	/registros: Tela para lançar registros de atividades.
	/turmas: Tela para visualizar o histórico de atividades.
8.4 Padrões de Código
o	HardCode
	CamelCase para nomes de variáveis e métodos.
	PascalCase para nomes de classes e modelos.
o	Documentação de Código
	Comentários detalhados para métodos críticos.
8.5 Fluxo de Desenvolvimento
o	Ambiente de Desenvolvimento
	Configuração do ambiente utilizando IONIC para criar as dependências e páginas.
	Utilização de Git para controle de versão.
o	Deploy
	Deploy realizado via AndroidStudio configurado no capacitor.
	Scripts de deploy não automatizados, tendo que realizar manualmente.
8.6 API RESTful
o	Estrutura das Rotas
	GET /api/
	POST /api/
o	Autenticação
	Não tem restrição de autenticação para realizar buscas de GET e POST.
o	Exemplo de Requisição
GET https://vitalimodas.com/API/EscoleEsportes/buscar_registros.php
{
    "DataInicio": "20/06/2024",
    "DataFim": "22/06/2024",
}
8.7 Contato para Suporte ao Desenvolvimento
o	Desenvolvedor Líder: Diego de Oliveira
o	Contato: ti.diego@ccbh.com.br
o	Documentação Técnica: Disponível no repositório GitHub, com informações detalhadas sobre as APIs e exemplos de uso:
	https://github.com/diego1570565/AplicativoEsportes
Data da Última Atualização: 20/08/2024
