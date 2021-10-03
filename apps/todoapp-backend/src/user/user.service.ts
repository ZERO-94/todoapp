import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}
  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    const matchedUser = this.findOne(createdUser.user_name);
    if (matchedUser) throw new BadRequestException('EXISTED_USER_NAME');
    return createdUser.save();
  }

  async findAll() {
    const result = await this.userModel.find({}).exec();
    return result;
  }

  async findOne(username: string): Promise<any> {
    const result = await this.userModel.findOne({ user_name: username }).exec();
    const userInformation = await result.toJSON();
    return userInformation;
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<any> {
    const result = await this.userModel
      .updateOne({ _id: userId }, updateUserDto)
      .exec();
    return result;
  }

  async remove(userId: string): Promise<any> {
    const result = await this.userModel.remove({ _id: userId }).exec();
    return result;
  }
}
