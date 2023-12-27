import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { usersModule } from './user/user.module';
import { users } from './user/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { HealthController } from './health/health.controller';
import { SequelizeHealthService } from './health/health.service';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import configs from 'src/Utils/environment/config';

@Module({
  imports: [
    SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'postgres',
    port: 5432,
    username: configs.DATABASE_USERNAME,
    password: configs.DATABASE_PASSWORD,
    database: configs.DATABASE_NAME,
    models: [users],
  }),
  usersModule,AuthModule,HealthModule],
  controllers: [AppController,UserController, AuthController,HealthController],
  providers: [AppService,UserService, AuthService,SequelizeHealthService],
})
export class AppModule {}

