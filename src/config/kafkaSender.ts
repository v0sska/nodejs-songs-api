import { Kafka } from 'kafkajs';
import { MessageToSent } from '../model/messageToSent';

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

const producer = kafka.producer();

const sendMessageToKafka = async (message : MessageToSent) => {

    await producer.connect();

    await producer.send({
        topic: 'messageToEmail',
        messages: [
            { value: JSON.stringify(message) },
        ],
    });
}

export default sendMessageToKafka;