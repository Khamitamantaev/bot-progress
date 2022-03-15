import { ProgressUpdate } from './progress-module/progress.update';
import { TelegrafModule } from 'nestjs-telegraf';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { sessionMiddleware } from './middleware/session.middleware';
import { ProgressModule } from './progress-module/progress-module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        token: process.env.TELEGRAM_API_KEY,
        middlewares: [sessionMiddleware],
        include: [ProgressModule]
      }),
      imports: [ConfigModule],
      inject: [ConfigService]
    }),
    ProgressModule
  ],
  controllers: [AppController],
  providers: [AppService, ProgressUpdate],
})
export class AppModule { }
