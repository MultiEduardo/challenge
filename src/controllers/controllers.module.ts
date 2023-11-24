import { Module } from "@nestjs/common";
import { CommonModule } from '../common/common.module';
import { EntitiesModule } from '../database/entities/entities.module';
import { AccountController } from './user/account.controller';
import { TaskController } from './task/task.controller';
import { AnalyticsController } from "./analytics/analytics.controller";
import { TaskService } from "../common/services/task/task.service";
import { UserService } from '../common/services/user/user.service';
import { AnalyticsService } from '../common/services/analytics/analytics.service';

@Module({
    controllers: [
        AccountController,
        TaskController,
        AnalyticsController
    ],
    imports: [
        CommonModule,
        EntitiesModule,
    ],
    exports: [
        CommonModule,
        EntitiesModule
    ],
    providers: [
        TaskService,
        UserService,
        AnalyticsService
    ]
})
export class ControllersModule {}