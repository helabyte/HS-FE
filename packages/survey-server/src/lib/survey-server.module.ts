import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { QuestionOptionsService } from './data-access/question-options.service';
import { QuestionsService } from './data-access/questions.service';
import databaseConfig from './utils/config/database.config';
import {
  Question,
  QuestionOption,
  QuestionOptionSchema,
  QuestionSchema,
} from './utils/schemas';
import { QuestionsController } from './features';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: '.development.env',
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
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionOptionsService],
  exports: [],
})
export class SurveyServerModule {}
