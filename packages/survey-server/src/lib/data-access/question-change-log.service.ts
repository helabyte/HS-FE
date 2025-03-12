import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { QuestionChangeLogType } from '@hela/survey-shared';

import { QuestionChangeLog, QuestionChangeLogDocument } from '../utils';

@Injectable()
export class QuestionChangeLogService {
  constructor(
    @InjectModel(QuestionChangeLog.name)
    private readonly questionChangeLogModel: Model<QuestionChangeLogDocument>
  ) {}

  async create(
    createQuestionChangeLogDto: Pick<QuestionChangeLogType, 'question'| 'currentValue' | 'previousValue'> & {context: string}
  ): Promise<QuestionChangeLog> {
    const createdChangeLog = new this.questionChangeLogModel(createQuestionChangeLogDto);
    return createdChangeLog.save();
  }


  async findByQuestionId(questionId: string): Promise<QuestionChangeLog[]> {
    return this.questionChangeLogModel
      .find({ question: questionId })
      .sort({ created: 'desc'})
      .exec();
  }

  async findOne(id: string): Promise<QuestionChangeLog> {
    const changelog = await this.questionChangeLogModel
      .findById(id)
      .exec();
    if (!changelog) {
      throw new NotFoundException(`Changelog with ID "${id}" not found`);
    }
    return changelog;
  }



}
