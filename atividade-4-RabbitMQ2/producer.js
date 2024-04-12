const amqp = require('amqplib');

async function sendOrder() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const queue = 'pedidos';

        await channel.assertQueue(queue, { durable: false });

        const order = { id: 1, product: 'Product X', quantity: 2 };

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)));

        console.log('Pedido enviado:', order);

        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);
    } catch (error) {
        console.error('Erro ao enviar pedido:', error);
    }
}

sendOrder();
