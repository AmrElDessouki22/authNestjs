import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class SequelizeHealthService {
  constructor(private readonly sequelize: Sequelize) {}

  async checkDatabaseConnection(): Promise<boolean> {
    try {
      await this.sequelize.authenticate();
      return true;
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      return false;
    }
  }
}
