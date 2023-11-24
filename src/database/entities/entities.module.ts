import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';
import { TaskAssignment } from './taskAssignment.entity';


@Module({
    imports: [
      TypeOrmModule.forFeature([
        User,
        Task,
        TaskAssignment
      ])
    ],
    exports: [
      TypeOrmModule
    ]
  })
  export class EntitiesModule {}