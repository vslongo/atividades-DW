const amqp = require('amqplib');

async function sendProcessedOrder() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const queue = 'pedidos_processados';

        await channel.assertQueue(queue, { durable: false });

        console.log('Aguardando pedidos processados...');

        channel.consume(queue, (message) => {
            const processedOrder = JSON.parse(message.content.toString());
            console.log('Enviando pedido processado:', processedOrder);

            // Simulação: envio para o sistema de envio/logística
            console.log('Pedido enviado para o sistema de envio/logística');

            channel.ack(message);
        });
    } catch (error) {
        console.error('Erro ao enviar pedido processado:', error);
    }
}

sendProcessedOrder();
