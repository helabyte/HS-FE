import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import databaseConfig from './utils/config/database.config';
import { QuestionsController } from './features';
import { HealthModule } from './features/health/health.module';
import {
  Question,
  QuestionOption,
  QuestionOptionSchema,
  QuestionSchema,
} from './utils';
import { QuestionOptionsService, QuestionsService } from './data-access';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      // envFilePath: '.development.env',
      ignoreEnvFile: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      { name: QuestionOption.name, schema: QuestionOptionSchema },
    ]),
    HealthModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionOptionsService],
  exports: [],
})
export class SurveyServerModule {}
