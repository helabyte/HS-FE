import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { QuestionOptionType, SafeAnyType } from '@hela/survey-shared';

export type QuestionOptionDocument = HydratedDocument<QuestionOptionType>;

@Schema({
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
  _id: true,
})
export class QuestionOption {
  @Prop({ required: true })
  inputType: string;

  @Prop({ required: true })
  label: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  value?: SafeAnyType;
}

export const QuestionOptionSchema = SchemaFactory.createForClass(QuestionOption);
