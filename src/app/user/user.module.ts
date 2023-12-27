import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from './user.model';

@Module({
    imports: [SequelizeModule.forFeature([users])],
    exports: [SequelizeModule]
})
export class usersModule {
    
}
