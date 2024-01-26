import { Injectable, OnModuleInit } from "@nestjs/common";
import { Consumer, Kafka, Producer } from "kafkajs";

@Injectable()
export class ProducerService implements OnModuleInit {
  private readonly producer: Producer;
  private readonly consumer: Consumer;

  constructor() {
    const kafkaClient = new Kafka({
      clientId: 'test',
      brokers: [ 'localhost:29092' ],
      // logLevel: logLevel.INFO
    });

    this.producer = kafkaClient.producer();
    this.consumer = kafkaClient.consumer({groupId: 'test-group'});

  }

  async onModuleInit() {
    console.log("Producer service  initialized ......");
    await this.consumeMessage();
  }

  async sendMessage(topic, messages: string) {
    await this.producer.connect()
    const d = await this.producer.send({
      topic: topic,
      messages: [
        { value: messages },
      ],
    })
    await this.producer.disconnect()
  }

  async consumeMessage() {
    await this.consumer.connect()
    await this.consumer.subscribe({ topic: 'output-topic', fromBeginning: true })

    await this.consumer.run({
      eachMessage: async ({message }) => {
        console.log({
          value: message.value.toString(),
        })
      },
    });
  }



}
