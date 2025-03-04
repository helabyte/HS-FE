import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { QuestionOptionType, QuestionType } from '@hela/survey-shared';

import {
  CreateQuestionDto,
  CreateQuestionOptionDto,
  Question,
  QuestionDocument,
  QuestionOption,
  QuestionOptionDocument,
  UpdateQuestionDto,
  UpdateQuestionOptionDto,
} from '../utils';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(QuestionOption.name)
    private questionOptionModel: Model<QuestionOptionDocument>
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<QuestionType> {
    const { options, ...questionData } = createQuestionDto;

    // Create options first, if provided
    let createdOptionIds: string[] = [];
    if (options && options.length > 0) {
      const createdOptions = await this.questionOptionModel.insertMany(options);
      createdOptionIds = createdOptions.map((option) => option._id);
    }
    const createdQuestion = new this.questionModel({
      ...questionData,
      options: createdOptionIds, // Assign the IDs of created options
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
    return this.questionModel.find().populate('options').exec();
  }
  async findAlloptions(): Promise<QuestionOption[]> {
    return this.questionOptionModel.find().exec();
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
  async findOptionOne(id: string): Promise<QuestionOption> {
    const option = await this.questionOptionModel.findById(id).exec();
    if (!option) {
      throw new NotFoundException(`Question option with ID "${id}" not found`);
    }
    return option;
  }

  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto
  ): Promise<QuestionType> {
    const { options, ...questionData } = updateQuestionDto;
    // Handle option updates/creation/deletion
    const updatedOptionIds: string[] = [];
    if (options) {
      for (const option of options) {
        if (option.id) {
          // Update existing option
          await this.questionOptionModel
            .findByIdAndUpdate(option.id, option, { new: true })
            .exec();
          updatedOptionIds.push(option.id); //Keep Id if Updated
        } else {
          // Create new option
          const createdOption = await this.createOption(
            option as CreateQuestionOptionDto
          );
          updatedOptionIds.push(createdOption._id); //push id to add
        }
      }
    }

    //Delete old Options
    const OldQuestion = await this.questionModel.findById(id).exec();
    if (OldQuestion) {
      const oldOptionIds = OldQuestion.options.map((op) => op.toString());
      const optionsToDelete = oldOptionIds.filter(
        (optionId) => !updatedOptionIds.includes(optionId)
      );
      await this.questionOptionModel.deleteMany({
        _id: { $in: optionsToDelete },
      });
    }

    const updatedQuestion = await this.questionModel
      .findByIdAndUpdate(
        id,
        {
          ...questionData,
          options: updatedOptionIds, // Assign the IDs of created options
        },
        { new: true }
      )
      .populate('options')
      .exec();

    if (!updatedQuestion) {
      throw new NotFoundException(`Question with ID "${id}" not found`);
    }
    return updatedQuestion;
  }

  async updateOption(
    id: string,
    updateQuestionOptionDto: UpdateQuestionOptionDto
  ): Promise<QuestionOption> {
    const updatedOption = await this.questionOptionModel
      .findByIdAndUpdate(id, updateQuestionOptionDto, { new: true })
      .exec();
    if (!updatedOption) {
      throw new NotFoundException(`Option with ID "${id}" not found`);
    }
    return updatedOption;
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
  async removeOption(id: string): Promise<void> {
    const result = await this.questionOptionModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Question option with ID "${id}" not found`);
    }
  }
}
