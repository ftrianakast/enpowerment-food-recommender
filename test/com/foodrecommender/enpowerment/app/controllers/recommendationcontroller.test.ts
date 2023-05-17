import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationsController } from '../../../../../../src/com/foodrecommender/enpowerment/app/controllers/recommendationcontroller';
import { RecommendationsService } from '../../../../../../src/com/foodrecommender/enpowerment/domain/service/recommendationservice';
import { UserService } from '../../../../../../src/com/foodrecommender/enpowerment/domain/service/userservice';
import { RestaurantsService } from '../../../../../../src/com/foodrecommender/enpowerment/domain/service/restaurantsservice';
import { DishesService } from '../../../../../../src/com/foodrecommender/enpowerment/domain/service/dishesservice';


describe('RecommendationsController', () => {
  let controller: RecommendationsController;
  let recommendationsService: RecommendationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommendationsController],
      providers: [RecommendationsService, UserService, RestaurantsService, DishesService],
    }).compile();

    controller = module.get<RecommendationsController>(RecommendationsController);
    recommendationsService = module.get<RecommendationsService>(RecommendationsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return recommendations based on user ID', async () => {
    const userId = '123';
    const expectedRecommendations = {
      restaurants: [
        {
          id: '1',
          name: 'Restaurant A',
          cuisine: ['Italian'],
          dishes: [{ id: '1', name: 'Dish A' }],
        },
      ],
      dishes: [
        {
          id: '1',
          name: 'Dish A',
          cuisine: 'Italian',
          ingredients: ['Tomatoes', 'Cheese', 'Basil'],
        },
      ],
    } as any;

    jest.spyOn(recommendationsService, 'getRecommendations').mockResolvedValue(expectedRecommendations);

    const result = await controller.getRecommendations(userId);

    expect(recommendationsService.getRecommendations).toHaveBeenCalledTimes(1);
    expect(recommendationsService.getRecommendations).toHaveBeenCalledWith(userId);
    expect(result).toEqual(expectedRecommendations);
  });
});