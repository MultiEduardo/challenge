import { Module } from '@nestjs/common';

import { CoreModule } from './core/core.module';
import { CommonModule } from './common/common.module';
import { ControllersModule } from './controllers/controllers.module';
import { EntitiesModule } from './database/entities/entities.module';

@Module({
  imports: [
    CoreModule,
    CommonModule,
    ControllersModule,
    EntitiesModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
