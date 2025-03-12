import { Controller, Get, Param } from '@nestjs/common';

import { QuestionChangeLogService } from '../data-access';

@Controller('question-change-logs')
export class QuestionChangeLogController {
  constructor(
    private readonly questionChangeLogService: QuestionChangeLogService
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionChangeLogService.findOne(id);
  }
}
