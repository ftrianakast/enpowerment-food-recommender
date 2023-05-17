import { Injectable } from '@nestjs/common';
import { UserService } from '../service/userservice';
import { RestaurantsService } from '../service/restaurantsservice';
import { DishesService } from '../service/dishesservice';

@Injectable()
export class RecommendationsService {
    constructor(
        private readonly usersService: UserService,
        private readonly restaurantsService: RestaurantsService,
        private readonly dishesService: DishesService,
    ) { }

    async getRecommendations(userId: string) {
        const user = await this.usersService.getUser(userId);
        const allRestaurants = await this.restaurantsService.getRestaurants();
        const allDishes = await this.dishesService.getDishes();

        const filteredRestaurants =
            allRestaurants
                .filter(restaurant => user.foodPreferences.some(preference => restaurant.cuisine.includes(preference)));

        let filteredDishes = allDishes
            .filter(dish => user.foodPreferences.includes(dish.cuisine))
            .filter(dish => !dish.ingredients.some(ingredient => user.allergies.includes(ingredient)));

        // Filter dishes from preferred restaurants
        filteredDishes = filteredDishes.filter(dish =>
            filteredRestaurants.some(restaurant =>
                restaurant.dishes.some(dishInRestaurant => dishInRestaurant.id === dish.id)
            )
        );

        return {
            restaurants: filteredRestaurants,
            dishes: filteredDishes,
        };
    }
}