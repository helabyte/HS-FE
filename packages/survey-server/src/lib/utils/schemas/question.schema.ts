import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { QuestionType } from '@hela/survey-shared';

import { QuestionOption } from './question-option.schema';

export type QuestionDocument = HydratedDocument<QuestionType>;

@Schema({
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
  _id: true,
})
export class Question {
  @Prop({ required: true })
  questionText: string;

  @Prop()
  chartType?: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'QuestionOption' }],
  }) // Reference QuestionOption
  options?: QuestionOption[];

  @Prop()
  surveyAssignment?: string; // Could be a reference to a Survey model

  @Prop({ type: [String] })
  topics?: string[];

  @Prop({ type: Object }) // Store additionalOptions as an object
  additionalOptions?: { searchable: boolean; reuse: boolean };

  @Prop()
  resultsVisibility?: boolean;

  @Prop({ default: false }) // Default to not public
  public?: boolean;

  @Prop()
  startDate?: Date;

  @Prop()
  endDate?: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
