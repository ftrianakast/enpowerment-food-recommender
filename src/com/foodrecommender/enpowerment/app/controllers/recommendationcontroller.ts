import { Controller, Get, Param } from '@nestjs/common';
import { RecommendationsService } from '@service/recommendationservice';

@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Get(':userId')
  async getRecommendations(@Param('userId') userId: string) {
    const recommendations = await this.recommendationsService.getRecommendations(userId);
    return recommendations;
  }
}