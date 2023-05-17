interface Restaurant {
    id: string;
    name: string;
    cuisine: string[]; // e.g. ['Italian', 'Mexican']
    location: string;
    dishes: Dish[];
  }