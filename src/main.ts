import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log(`${process.env.MONGO_URI}`)

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT);
}
bootstrap();
