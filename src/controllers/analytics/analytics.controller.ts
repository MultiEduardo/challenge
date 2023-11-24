import { Controller, Get } from "@nestjs/common";
import { AnalyticsService } from '../../common/services/analytics/analytics.service';

@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    /**
     * @description_EN We obtain data from the two statistics
     * @description_ES Obtenemos los datos de las dos estadisticas
     * @since 0.0.1
     * 
     * @author Bryan Vazquez
     */
    @Get()
    async getAnalytics() {
        try {
            const tasksPerUser = await this.analyticsService.getTasksPerUser();
            const averageEstimationHours = await this.analyticsService.getAverageEstimationHoursByUser();
            return { data: tasksPerUser, averageEstimationHours };
        } catch {
            return { error: 'Intente más tarde' };
        }
    }
}