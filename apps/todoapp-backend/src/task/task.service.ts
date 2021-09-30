import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDocument } from './entities/task.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private taskModel: Model<TaskDocument>) {}
  create(createTaskDto: CreateTaskDto) {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findWithPriority(requestedPriority: number) {
    const neededTasks = await this.taskModel
      .find({ priority: requestedPriority })
      .exec();
    return neededTasks;
  }

  findOne(id: Types.ObjectId) {
    const neededTask = this.taskModel.findById(id);
    return neededTask;
  }

  update(id: Types.ObjectId, updateTaskDto: UpdateTaskDto) {
    const result = this.taskModel.findByIdAndUpdate(id, updateTaskDto);
    return result;
  }

  async remove(id: Types.ObjectId) {
    const task = await this.taskModel.findByIdAndRemove(id);
    if (!task) throw new NotFoundException('TASK_NOT_FOUND');
    return task;
  }
}
