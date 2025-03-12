import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { diff } from 'deep-object-diff';

import { QuestionOptionType, QuestionType } from '@hela/survey-shared';

import {
  CreateQuestionDto,
  CreateQuestionOptionDto,
  Question,
  QuestionDocument,
  QuestionOption,
  QuestionOptionDocument,
  UpdateQuestionDto,
} from '../utils';

import { QuestionChangeLogService } from './question-change-log.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(QuestionOption.name)
    private questionOptionModel: Model<QuestionOptionDocument>,
    private questionChangeLogService: QuestionChangeLogService
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<QuestionType> {
    const { options, ...questionData } = createQuestionDto;

    let createdOptionIds: string[] = [];
    if (options && options.length > 0) {
      const createdOptions = await this.questionOptionModel.insertMany(options);
      createdOptionIds = createdOptions.map((option) => option._id);
    }
    const createdQuestion = new this.questionModel({
      ...questionData,
      options: createdOptionIds,
    });

    return createdQuestion.save();
  }

  async createOption(
    createQuestionOptionDto: CreateQuestionOptionDto
  ): Promise<QuestionOptionType> {
    const createdOption = new this.questionOptionModel(createQuestionOptionDto);
    return createdOption.save();
  }

  async findAll(): Promise<QuestionType[]> {
    return this.questionModel
      .find()
      .populate('options')
      .sort({ created: 'desc' })
      .exec();
  }

  async findOne(id: string): Promise<QuestionType> {
    const question = await this.questionModel
      .findById(id)
      .populate('options')
      .exec();
    if (!question) {
      throw new NotFoundException(`Question with ID "${id}" not found`);
    }
    return question;
  }

  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto
  ): Promise<QuestionType> {
    const { options, context, ...questionData } = updateQuestionDto;
    const oldQuestion = await this.questionModel
      .findById(id)
      .populate({
        path: 'options',
        select: '-created -updated',
      })
      .select('-created -updated')
      .exec();

    const updatedOptionIds: string[] = [];
    if (options) {
      for (const option of options) {
        if (option._id) {
          await this.questionOptionModel
            .findByIdAndUpdate(option._id, option)
            .exec();
          updatedOptionIds.push(option._id);
        } else {
          const createdOption = await this.createOption(
            option as CreateQuestionOptionDto
          );
          updatedOptionIds.push(createdOption._id);
        }
      }
    }

    const updatedQuestion = await this.questionModel
      .findByIdAndUpdate(id, {
        ...questionData,
        options: updatedOptionIds, // Assign the IDs of created options
      })
      .populate('options')
      .exec();

    if (!updatedQuestion) {
      throw new NotFoundException(`Question with ID "${id}" not found`);
    }

    const updatedFoundQuestion = await this.questionModel
      .findById(id)
      .populate({
        path: 'options',
        select: '-created -updated',
      })
      .select('-created -updated')
      .exec();

    const oldParsed = JSON.parse(JSON.stringify(oldQuestion));
    const updatedParsed = JSON.parse(
      JSON.stringify(updatedFoundQuestion.toObject())
    );

    const diffQuestion = diff(oldParsed, updatedParsed);

    if (diffQuestion && Object.keys(diffQuestion).length > 0) {
      await this.questionChangeLogService.create({
        question: updatedQuestion,
        previousValue: oldParsed,
        currentValue: updatedParsed,
        context,
      });
    }

    return updatedQuestion;
  }

  async remove(id: string): Promise<void> {
    const result = await this.questionModel.findByIdAndDelete(id).exec();
    //Delete old Options
    if (result) {
      const oldOptionIds = result.options.map((op) => op.toString());
      await this.questionOptionModel.deleteMany({ _id: { $in: oldOptionIds } });
    }

    if (!result) {
      throw new NotFoundException(`Question with ID "${id}" not found`);
    }
  }
}
