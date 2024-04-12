# Sistema de Mensageria com RabbitMQ

Este é um exemplo de implementação de um sistema de mensageria utilizando RabbitMQ para comunicação assíncrona entre sistemas distribuídos.

## Requisitos

- Node.js
- RabbitMQ Server

## Instalação

1. Clone o repositório:

https://github.com/vslongo/atividades-DW/tree/main/atividade-4-RabbitMQ2

2. Instale as dependências:

cd atividade-4-RabbitMQ2
npm install

3. Certifique-se de ter o RabbitMQ Server instalado e em execução.

## Utilização

1. Inicie o consumidor de mensagens para processamento de pedidos:

node consumer_processamento.js

2. Inicie o consumidor de mensagens para envio de pedidos processados:

node consumer_envio.js

3. Por fim, inicie o produtor de mensagens para simular a loja online e enviar pedidos:

node producer.js


## Testes

- Verifique se os pedidos são corretamente processados e registrados no banco de dados da loja.
- Verifique se os pedidos processados são corretamente enviados para o sistema de envio/logística.
