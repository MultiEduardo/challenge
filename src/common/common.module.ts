import { HttpModule, Module } from '@nestjs/common';
import { EntitiesModule } from '../database/entities/entities.module';
import { UserService } from './services/user/user.service';
import { TaskService } from './services/task/task.service';
import { AnalyticsService } from './services/analytics/analytics.service';

@Module({
    imports: [
        CommonModule,
        EntitiesModule,
        HttpModule
    ],
    providers: [
        UserService,
        TaskService,
        AnalyticsService
    ],
    exports: [
        UserService,
        TaskService,
        AnalyticsService
    ]
})
export class CommonModule {
}