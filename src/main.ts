import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { GATEWAY_PORT } from './constants/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(GATEWAY_PORT);
}
bootstrap();
