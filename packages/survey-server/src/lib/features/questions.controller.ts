import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { QuestionChangeLogService, QuestionsService } from '../data-access';
import {
  CreateQuestionDto,
  CreateQuestionOptionDto,
  UpdateQuestionDto,
} from '../utils';

@Controller('questions')
@UsePipes(new ValidationPipe({ transform: true }))
export class QuestionsController {
  constructor(
    private readonly questionService: QuestionsService,
    private readonly questionChangeLogService: QuestionChangeLogService
  ) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Post('options')
  createOption(@Body() createQuestionOptionDto: CreateQuestionOptionDto) {
    return this.questionService.createOption(createQuestionOptionDto);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }

  @Get(':id/logs')
  findAllLog(@Param('id') id: string) {
    return this.questionChangeLogService.findByQuestionId(id);
  }
}
