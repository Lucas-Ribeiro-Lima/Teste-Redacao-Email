# Teste Prático de Envio de E-mail 📧

Este projeto é uma aplicação web simples que simula o envio de um e-mail com um formulário interativo. O cenário consiste em solicitar um documento de veículo ao setor de manutenção, enviando o e-mail para um responsável e copiando um gerente.

## Visão Geral

O objetivo principal deste projeto é permitir ao usuário preencher um formulário de e-mail, com destinatários, assunto, anexo e mensagem, e simular o envio deste e-mail. A interface também permite incluir o nome do candidato e a data do teste.

### Estrutura do Projeto

- **HTML**: Estrutura básica da aplicação, composta por cabeçalho, formulário de preenchimento do e-mail e campos de metadados como destinatário, cópia (CC), assunto, anexo, e o corpo da mensagem.
- **CSS**: Estilização aplicada ao layout da página e organização dos campos do formulário.
  - `style.css`: Estilos gerais para a página.
  - `campos.css`: Estilos específicos para os campos do formulário.
  - `estrutura.css`: Estilos para organizar a estrutura visual da página.
- **JavaScript**: Comportamento interativo da página. Scripts para lidar com eventos de botão como "Enviar", "Cancelar", e "Limpar".
  - `script.js`: Arquivo para o gerenciamento de ações e funcionalidades interativas.
  
## Funcionalidades

- Preenchimento do nome do candidato e data do teste.
- Simulação de envio de e-mail com os seguintes campos:
  - **Para**: Endereço de e-mail do destinatário.
  - **Cc**: Endereço de e-mail para cópia.
  - **Assunto**: Assunto do e-mail.
  - **Anexo**: Upload de arquivo anexo.
  - **Mensagem**: Corpo do e-mail.
- Botões para:
  - **Enviar**: Simula o envio do e-mail.
  - **Cancelar**: Cancela a operação.
  - **Limpar**: Limpa os campos preenchidos.

## Estrutura de Diretórios

```bash
.
├── css
│   ├── style.css
│   ├── campos.css
│   └── estrutura.css
├── public
│   └── zimbra_logo.png
├── javascript
│   └── script.js
├── index.html
└── README.md
```

## Variáveis de Ambiente

- **Email SMTP credentials**
  - **EMAIL_SMTP_HOST**="stmp.host.com"
  - **EMAIL_USER**="account@host.com"
  - **EMAIL_PWD**="accountpwd"
  - **EMAIL_CC_USER**="accountcc@host.com"