import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { QuestionOptionsService, QuestionsService } from '../data-access';
import {
  CreateQuestionDto,
  CreateQuestionOptionDto,
  UpdateQuestionDto,
  UpdateQuestionOptionDto,
} from '../utils';
import { SafeAnyType } from '@hela/survey-shared';

@Controller('questions')
@UsePipes(new ValidationPipe({ transform: true }))
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

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

  @Get('options')
  findAlloptions() {
    return this.questionService.findAlloptions();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Get('options/:id')
  findOptionOne(@Param('id') id: string) {
    return this.questionService.findOptionOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Patch('options/:id')
  updateOption(
    @Param('id') id: string,
    @Body() updateQuestionOptionDto: UpdateQuestionOptionDto
  ) {
    return this.questionService.updateOption(id, updateQuestionOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }

  @Delete('options/:id')
  removeOption(@Param('id') id: string) {
    return this.questionService.removeOption(id);
  }
}
