import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { users } from './user.model';
import {UserDto} from './userDto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(users)
    private readonly userModel: typeof users,
  ) {}

  async create(user: UserDto): Promise<users> {
    return this.userModel.create(user);
  }

  async findAll(): Promise<users[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<users | null> {
    
    return this.userModel.findByPk(id);
  }

  async findOnebyCriteria(search: any): Promise<users | null> {
    return this.userModel.findOne({
        where:{
            ...search
        }
    });
  }

  async update(id: number, updateUser: Partial<UserDto>): Promise<[number, users[]]> {
    const [affectedCount, updatedUsers] = await this.userModel.update(updateUser, {
      where: { id },
      returning: true,
    });

    return [affectedCount, updatedUsers];
  }

  async remove(id: number): Promise<number> {
    const result = await this.userModel.destroy({
      where: { id },
    });
    return result;
  }
}
