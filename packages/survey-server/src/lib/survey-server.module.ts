import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { HealthModule } from './features/health/health.module';
import databaseConfig from './utils/config/database.config';
import { QuestionChangeLogService, QuestionOptionsService, QuestionsService } from './data-access';
import { QuestionChangeLogController, QuestionsController } from './features';
import {
  Question,
  QuestionChangeLog,
  QuestionChangeLogSchema,
  QuestionOption,
  QuestionOptionSchema,
  QuestionSchema,
} from './utils';

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
      { name: QuestionChangeLog.name, schema: QuestionChangeLogSchema },
    ]),
    HealthModule,
  ],
  controllers: [QuestionsController,QuestionChangeLogController],
  providers: [QuestionsService, QuestionOptionsService, QuestionChangeLogService],
  exports: [],
})
export class SurveyServerModule {}
