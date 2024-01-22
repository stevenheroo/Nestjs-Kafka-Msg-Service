import { Body, Controller, OnModuleInit, Post } from "@nestjs/common";
import { ProducerService } from "./producer.service";

@Controller('producer')
export class ProducerController implements OnModuleInit{
  constructor(private readonly producerService: ProducerService) {}

  @Post('send-message')
  async sendMessage(@Body() body: { topic: string; messages: string }) {
    const { topic , messages} = body;
    await this.producerService.sendMessage(topic, messages);
  }

  async onModuleInit() {
    await this.producerService.consumeMessage();
  }
}
