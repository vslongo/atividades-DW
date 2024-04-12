const amqp = require('amqplib');

async function processOrder() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const queue = 'pedidos';

        await channel.assertQueue(queue, { durable: false });

        console.log('Aguardando pedidos...');

        channel.consume(queue, (message) => {
            const order = JSON.parse(message.content.toString());
            console.log('Processando pedido:', order);

            // Simulação: processamento e registro no banco de dados
            console.log('Pedido processado e registrado no banco de dados');

            channel.ack(message);
        });
    } catch (error) {
        console.error('Erro ao processar pedido:', error);
    }
}

processOrder();
