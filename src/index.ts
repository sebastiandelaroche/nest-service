import * as dotenvSafe from 'dotenv-safe';

dotenvSafe.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabbitMQServer } from './servers/rabbitmq-server';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.connectMicroservice({
        strategy: new RabbitMQServer(process.env.MESSAGE_BROKER_URL, process.env.SERVICE_NAME),
    });

    await app.startAllMicroservicesAsync();

    await app.listen(3000);
}

bootstrap();
