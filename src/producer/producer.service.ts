import { Injectable } from "@nestjs/common";
import { Consumer, Kafka, logLevel, Producer } from "kafkajs";

@Injectable()
export class ProducerService {
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

  async sendMessage(topic, messages: string) {
    await this.producer.connect()
    await this.producer.send({
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
