import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { QuestionChangeLogType, QuestionType, SafeAnyType } from '@hela/survey-shared';

export type QuestionChangeLogDocument = HydratedDocument<QuestionChangeLogType>;

@Schema({
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
  _id: true,
})
export class QuestionChangeLog {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Question',
  })
  question: QuestionType;


  // @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  // diff?: SafeAnyType;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  currentValue?: SafeAnyType;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  previousValue?: SafeAnyType;

  @Prop({ required: true })
  context: string;
}

export const QuestionChangeLogSchema = SchemaFactory.createForClass(QuestionChangeLog);
