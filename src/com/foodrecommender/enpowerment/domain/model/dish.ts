export interface Dish {
    id: string;
    name: string;
    ingredients: string[]; // e.g. ['Pasta', 'Tomato', 'Cheese']
    cuisine: string;
}