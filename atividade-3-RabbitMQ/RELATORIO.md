# Relatório do Experimento com RabbitMQ Tutorials

Este é um relatório descritivo do experimento realizado utilizando o RabbitMQ Tutorials. O experimento envolveu a escolha de uma linguagem de programação, o desenvolvimento de código e a análise dos resultados obtidos.

## Linguagem de Programação Escolhida

Para este experimento, escolhi a linguagem de programação JavaScript devido à sua ampla utilização tanto no front-end quanto no back-end, além de sua popularidade e suporte para o RabbitMQ através da biblioteca `amqplib`.

## Descrição do Código Desenvolvido

O código desenvolvido para este experimento é baseado no tutorial "Hello World" fornecido no repositório RabbitMQ Tutorials. O tutorial consiste em criar um produtor (emissor) que envia uma mensagem para uma fila e um consumidor (receptor) que recebe essa mensagem da fila.

### Código do Produtor (Emissor)

```javascript
const amqp = require('amqplib');

async function send() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'hello';
  const message = 'Hello World!';

  await channel.assertQueue(queue);
  await channel.sendToQueue(queue, Buffer.from(message));
  console.log(` [x] Sent '${message}'`);

  await channel.close();
  await connection.close();
}

send().catch(console.error);
```javascript
# Código do Consumidor (Receptor)

```const amqp = require('amqplib');

async function receive() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'hello';

  await channel.assertQueue(queue);
  console.log(' [*] Waiting for messages. To exit press CTRL+C');

  channel.consume(queue, (msg) => {
    console.log(` [x] Received ${msg.content.toString()}`);
  }, { noAck: true });
}

receive().catch(console.error);
```

# Mensagens Trocadas

O produtor envia a mensagem "Hello World!" para a fila 'hello'. O consumidor está constantemente esperando por mensagens na fila 'hello' e, quando uma mensagem é recebida, ela é impressa no console.

# Análise dos Resultados

Durante o experimento, as mensagens foram trocadas com sucesso entre o produtor e o consumidor. A comunicação entre eles ocorreu sem problemas, e as mensagens foram recebidas conforme esperado.

# Dificuldades Encontradas

Não foram encontradas dificuldades significativas durante a realização deste experimento. A biblioteca amqplib simplificou a interação com o RabbitMQ, e o tutorial fornecido pelo RabbitMQ Tutorials foi claro e fácil de seguir.