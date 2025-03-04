import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { QuestionOptionType } from '@hela/survey-shared';

import {
  CreateQuestionOptionDto,
  QuestionOption,
  QuestionOptionDocument,
  UpdateQuestionOptionDto,
} from '../utils';

@Injectable()
export class QuestionOptionsService {
  constructor(
    @InjectModel(QuestionOption.name)
    private questionOptionModel: Model<QuestionOptionDocument>
  ) {}

  async create(
    createQuestionOptionDto: CreateQuestionOptionDto
  ): Promise<QuestionOptionType> {
    const createdQuestionOption = new this.questionOptionModel(
      createQuestionOptionDto
    );
    return createdQuestionOption.save();
  }

  async findAll(): Promise<QuestionOption[]> {
    return this.questionOptionModel.find().exec();
  }

  async findOne(id: string): Promise<QuestionOption> {
    return this.questionOptionModel.findById(id).exec();
  }

  async update(
    id: string,
    updateQuestionOptionDto: UpdateQuestionOptionDto
  ): Promise<QuestionOptionType> {
    return this.questionOptionModel
      .findByIdAndUpdate(id, updateQuestionOptionDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<QuestionOptionType> {
    return this.questionOptionModel.findByIdAndDelete(id).exec();
  }

  async incrementVotes(id: string): Promise<QuestionOption> {
    return this.questionOptionModel
      .findByIdAndUpdate(id, { $inc: { votes: 1 } }, { new: true })
      .exec();
  }

  async findByInputType(inputType: string): Promise<QuestionOptionType[]> {
    return this.questionOptionModel.find({ inputType }).exec();
  }

  async bulkCreate(
    options: CreateQuestionOptionDto[]
  ): Promise<QuestionOptionType[]> {
    return this.questionOptionModel.insertMany(options);
  }
}
