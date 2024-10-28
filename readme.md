# Projeto de Envio de E-mail 📧

Este projeto é uma aplicação web simples que simula o envio de e-mails através de um formulário interativo. O objetivo principal é permitir testem a habilidade de candidatos com redações de e-mail.

## Visão Geral

A aplicação permite ao usuário preencher um formulário que inclui destinatários, cópia (CC), assunto, mensagem e anexo. O sistema simula o envio do e-mail, proporcionando uma experiência interativa e intuitiva.

## Tecnologias Utilizadas

### Frontend
- **HTML**: Estrutura básica da aplicação.
- **CSS**: Estilização da página e dos campos do formulário.
- **JavaScript**: Funcionalidade interativa do formulário, com manipulação de eventos e chamadas para o backend.

### Backend
- **Node.js**: Ambiente de execução para o servidor.
- **Express**: Framework para simplificação do gerenciamento de rotas e requisições.
- **Nodemailer**: Biblioteca para envio de e-mails.
- **Multer**: Middleware para gerenciamento de uploads de arquivos.
- **Zod**: Biblioteca para validação de dados recebidos.
- **Winston**: Logger para registro de eventos e erros no servidor.

## Estrutura do Projeto

### Diretório do Projeto

```bash
.
├── backend
│   ├── .env              # Variáveis de ambiente
│   ├── package.json       # Dependências do backend
│   ├── tsconfig.json      # Configurações do TypeScript
│   └── src
│       ├── config         # Configurações do aplicativo
│       ├── errors         # Tratamento de erros
│       ├── lib            # Bibliotecas utilitárias
│       ├── logs           # Registro de logs
│       ├── middlewares     # Middlewares do Express
│       ├── routes         # Definições de rotas
│       ├── schemas        # Esquemas de validação
│       ├── app.ts         # Configuração do aplicativo
│       └── main.ts        # Ponto de entrada do servidor
├── frontend
│   ├── css               # Folhas de estilo
│   │   ├── style.css
│   │   ├── campos.css
│   │   └── estrutura.css
│   ├── javascript        # Scripts JavaScript
│   │   └── script.js
│   ├── index.html        # Página principal da aplicação
│   └── zimbra_logo.png   # Logo da aplicação
└── README.md             # Documentação do projeto
```
## Variáveis de Ambiente

- **Email SMTP credentials**
  - **EMAIL_SMTP_HOST**="stmp.host.com"
  - **EMAIL_USER**="account@host.com"
  - **EMAIL_PWD**="accountpwd"
  - **EMAIL_CC_USER**="accountcc@host.com"