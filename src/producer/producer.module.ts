import { Module } from '@nestjs/common';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';
import { ClientKafka, ClientsModule, Transport } from "@nestjs/microservices";
@Module({
  imports: [ClientsModule.register([
    {
      name: 'KAFKA_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'test', // Provide a unique client ID
          brokers: ['localhost:29092'], // Replace with your Kafka broker list
        },
        consumer: {
          groupId: 'test_group', // Replace with your Kafka consumer group ID
        },
      },
    },
  ])],
  controllers: [ProducerController],
  providers: [ProducerService, ClientKafka],
})
export class ProducerModule {}
