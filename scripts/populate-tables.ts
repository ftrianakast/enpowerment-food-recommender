import AWS, { ConfigurationOptions } from 'aws-sdk';

const config: ConfigurationOptions & { region: string; endpoint: string } = {
    region: 'local', // Set the appropriate AWS region
    endpoint: 'http://localhost:8000', // The endpoint for DynamoDB Local
};

AWS.config.update(config);

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function populateTables() {
  try {
    // Populate the Users table
    const usersData = [
      {
        id: '1',
        name: 'John Doe',
        foodPreferences: ['Italian', 'Mexican'],
        allergies: ['Nuts', 'Shellfish'],
      },
      {
        id: '2',
        name: 'Jane Smith',
        foodPreferences: ['Indian', 'Thai'],
        allergies: ['Dairy', 'Gluten'],
      },
      // Add more user data here
    ];

    for (const user of usersData) {
      const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
        TableName: 'Users',
        Item: user,
      };

      await dynamodb.put(params).promise();
    }

    console.log('Users table populated');

    // Populate the Restaurants table
    const restaurantsData = [
      {
        id: '1',
        name: 'Italian Delights',
        cuisine: ['Italian'],
        location: '123 Main St',
        dishes: [
          {
            id: '1',
            name: 'Spaghetti Carbonara',
            ingredients: ['Pasta', 'Eggs', 'Bacon'],
            cuisine: 'Italian',
          },
          {
            id: '2',
            name: 'Margherita Pizza',
            ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Basil'],
            cuisine: 'Italian',
          },
          // Add more dish data for Italian Delights here
        ],
      },
      {
        id: '2',
        name: 'Mexican Fiesta',
        cuisine: ['Mexican'],
        location: '456 Elm St',
        dishes: [
          {
            id: '3',
            name: 'Tacos al Pastor',
            ingredients: ['Marinated Pork', 'Pineapple', 'Onions', 'Cilantro'],
            cuisine: 'Mexican',
          },
          {
            id: '4',
            name: 'Guacamole',
            ingredients: ['Avocado', 'Tomato', 'Onion', 'Lime'],
            cuisine: 'Mexican',
          },
          // Add more dish data for Mexican Fiesta here
        ],
      },
      // Add more restaurant data here
    ];

    for (const restaurant of restaurantsData) {
      const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
        TableName: 'Restaurants',
        Item: restaurant,
      };

      await dynamodb.put(params).promise();
    }

    console.log('Restaurants table populated');

    // Populate the Dishes table
    const dishesData = [];

    for (const restaurant of restaurantsData) {
      dishesData.push(...restaurant.dishes);
    }

    for (const dish of dishesData) {
      const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
        TableName: 'Dishes',
        Item: dish,
      };

      await dynamodb.put(params).promise();
    }

    console.log('Dishes table populated');

    console.log('Tables populated successfully');
  } catch (error) {
    console.error('Error populating tables:', error);
  }
}

populateTables();