import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService} from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import Database from './database';
import { EntitiesModule } from '../database/entities/entities.module';

@Module({
  imports: [
    //RouterModule.forRoutes([].concat(GlobalRoutes, ClienteRoutes)),
    EntitiesModule,
    CommonModule,
    TypeOrmModule.forRoot(Database),
  ],
  exports: [],
  providers: [ConfigService]
})
export class CoreModule {

}
