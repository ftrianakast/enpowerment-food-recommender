import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../../../../src/com/foodrecommender/enpowerment/domain/service/userservice';
import { RestaurantsService } from '../../../../../../src/com/foodrecommender/enpowerment/domain/service/restaurantsservice';
import { DishesService } from '../../../../../../src/com/foodrecommender/enpowerment/domain/service/dishesservice';
import { RecommendationsService } from '../../../../../../src/com/foodrecommender/enpowerment/domain/service/recommendationservice';

describe('RecommendationsService', () => {
    let service: RecommendationsService;
    let userService: UserService;
    let restaurantsService: RestaurantsService;
    let dishesService: DishesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RecommendationsService,
                {
                    provide: UserService,
                    useValue: {
                        getUser: jest.fn(),
                    },
                },
                {
                    provide: RestaurantsService,
                    useValue: {
                        getRestaurants: jest.fn(),
                    },
                },
                {
                    provide: DishesService,
                    useValue: {
                        getDishes: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<RecommendationsService>(RecommendationsService);
        userService = module.get<UserService>(UserService);
        restaurantsService = module.get<RestaurantsService>(RestaurantsService);
        dishesService = module.get<DishesService>(DishesService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return filtered restaurants and dishes based on user preferences', async () => {
        const userId = '123';

        const user = {
            id: userId,
            name: 'John Doe',
            foodPreferences: ['Italian', 'Japanese'],
            allergies: ['Peanuts'],
        };

        const allRestaurants = [
            {
                id: '1',
                name: 'Restaurant A',
                cuisine: ['Italian'],
                dishes: [{ id: '1', name: 'Dish A' }],
            },
            {
                id: '2',
                name: 'Restaurant B',
                cuisine: ['Japanese'],
                dishes: [{ id: '2', name: 'Dish B' }],
            },
            {
                id: '3',
                name: 'Restaurant C',
                cuisine: ['Mexican'],
                dishes: [{ id: '3', name: 'Dish C' }],
            },
        ] as Restaurant[];
        
        const allDishes = [
            {
                id: '1',
                name: 'Dish A',
                cuisine: 'Italian',
                ingredients: ['Tomatoes', 'Cheese', 'Basil'],
            },
            {
                id: '2',
                name: 'Dish B',
                cuisine: 'Japanese',
                ingredients: ['Rice', 'Fish', 'Seaweed'],
            },
            {
                id: '3',
                name: 'Dish C',
                cuisine: 'Mexican',
                ingredients: ['Tortilla', 'Meat', 'Beans'],
            },
        ];

        jest.spyOn(userService, 'getUser').mockResolvedValueOnce(user);
        jest.spyOn(restaurantsService, 'getRestaurants').mockResolvedValueOnce(allRestaurants);
        jest.spyOn(dishesService, 'getDishes').mockResolvedValueOnce(allDishes);

        const expectedFilteredRestaurants = [
            {
                id: '1',
                name: 'Restaurant A',
                cuisine: ['Italian'],
                dishes: [{ id: '1', name: 'Dish A' }],
            },
            {
                id: '2',
                name: 'Restaurant B',
                cuisine: ['Japanese'],
                dishes: [{ id: '2', name: 'Dish B' }],
            },
        ];

        const expectedFilteredDishes = [
            {
                id: '1',
                name: 'Dish A',
                cuisine: 'Italian',
                ingredients: ['Tomatoes', 'Cheese', 'Basil'],
            },
            {
                id: '2',
                name: 'Dish B',
                cuisine: 'Japanese',
                ingredients: ['Rice', 'Fish', 'Seaweed'],
            },
        ];

        const filteredRestaurants = [
            {
                id: '1', name: 'Restaurant A', cuisine: ['Italian'],
                dishes: [{ id: '1', name: 'Dish A' }],
            },
            {
                id: '2',
                name: 'Restaurant B',
                cuisine: ['Japanese'],
                dishes: [{ id: '2', name: 'Dish B' }],
            },
        ];

        jest.spyOn(userService, 'getUser').mockResolvedValueOnce(user);
        jest.spyOn(restaurantsService, 'getRestaurants').mockResolvedValueOnce(allRestaurants);
        jest.spyOn(dishesService, 'getDishes').mockResolvedValueOnce(allDishes);

        const recommendations = await service.getRecommendations(userId);

        expect(userService.getUser).toHaveBeenCalledTimes(1);
        expect(userService.getUser).toHaveBeenCalledWith(userId);
        expect(restaurantsService.getRestaurants).toHaveBeenCalledTimes(1);
        expect(dishesService.getDishes).toHaveBeenCalledTimes(1);

        expect(recommendations.restaurants).toEqual(expectedFilteredRestaurants);
        expect(recommendations.dishes).toEqual(expectedFilteredDishes);
    });
});