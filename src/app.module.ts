import { Module } from '@nestjs/common';
import { UsersController } from './com/foodrecommender/enpowerment/app/controllers/ussercontroller';
import { UserService } from '@domain/service/userservice';
import { RecommendationsController } from './com/foodrecommender/enpowerment/app/controllers/recommendationcontroller';
import { RecommendationsService } from '@domain/service/recommendationservice';
import { DishesService } from '@domain/service/dishesservice';
import { RestaurantsService } from '@domain/service/restaurantsservice';

@Module({
  imports: [],
  controllers: [UsersController, RecommendationsController],
  providers: [UserService, DishesService, RestaurantsService, RecommendationsService],
})
export class AppModule {}
