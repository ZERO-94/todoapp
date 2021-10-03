import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get('findWithPriority/:priority')
  findWithPriority(@Param('priority') priority: number) {
    return this.taskService.findWithPriority(priority);
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.taskService.remove(id);
  }
}
