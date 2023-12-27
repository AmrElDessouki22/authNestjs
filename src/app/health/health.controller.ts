import { Controller, Get } from '@nestjs/common';
import { SequelizeHealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly sequelizeHealthService: SequelizeHealthService) {}

  @Get()
  async checkHealth(): Promise<string> {
    const isDbConnected = await this.sequelizeHealthService.checkDatabaseConnection();
    return isDbConnected ? 'Database is connected' : 'Database is not connected';
  }
}
