import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'src/commons/configs/app.config'


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors()
    app.setGlobalPrefix("api")

    const appPort = config().SERVER.PORT
    await app.listen(appPort, () => { `Application start successfully at port ${appPort}` });
}
bootstrap();
