import * as amqp from 'amqplib';
import { Server, CustomTransportStrategy } from '@nestjs/microservices';
import { bus as createBus } from '@friends-learning/bus';

export class RabbitMQServer extends Server implements CustomTransportStrategy {
    private server: amqp.Connection = null;
    private channel: amqp.Channel = null;
    private bus: any;

    constructor(
        private readonly host: string,
        private readonly queue: string) {
        super();
    }

    public async listen(callback: () => void) {
        await this.init();
        await this.bus.subscribe('createUser', this.handleMessage.bind(this));
        callback();
    }

    public close() {
        // TODO: in @friends-learning/bus missing close rabbitmq connections
        this.bus.connection && this.bus.connection.close();
    }

    private async handleMessage(message, ack, nack) {
        try {
            const { content } = message;
            const messageObj = JSON.parse(content.toString());
            ack();
        } catch (error) {
            nack();
        }
    }

    private async init() {
        this.bus = await createBus({
            url: process.env.MESSAGE_BROKER_URL,
            service: 'nest-service',
            context: 'nest',
        });
    }
}