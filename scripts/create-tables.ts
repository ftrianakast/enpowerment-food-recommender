import AWS, { ConfigurationOptions } from 'aws-sdk';

const config: ConfigurationOptions & { region: string; endpoint: string } = {
    region: 'us-west-2', // Set the appropriate AWS region
    endpoint: 'http://localhost:8000', // The endpoint for DynamoDB Local
};

AWS.config.update(config);

const dynamodb = new AWS.DynamoDB();

async function createTables() {
    try {
        // Create the Users table
        const usersTableParams: AWS.DynamoDB.CreateTableInput = {
            TableName: 'Users',
            KeySchema: [
                { AttributeName: 'id', KeyType: 'HASH' },
            ],
            AttributeDefinitions: [
                { AttributeName: 'id', AttributeType: 'S' },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        };

        await dynamodb.createTable(usersTableParams).promise();
        console.log('Users table created');

        // Create the Restaurants table
        const restaurantsTableParams: AWS.DynamoDB.CreateTableInput = {
            TableName: 'Restaurants',
            KeySchema: [
                { AttributeName: 'id', KeyType: 'HASH' },
            ],
            AttributeDefinitions: [
                { AttributeName: 'id', AttributeType: 'S' },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        };

        await dynamodb.createTable(restaurantsTableParams).promise();
        console.log('Restaurants table created');

        // Create the Dishes table
        const dishesTableParams: AWS.DynamoDB.CreateTableInput = {
            TableName: 'Dishes',
            KeySchema: [
                { AttributeName: 'id', KeyType: 'HASH' },
            ],
            AttributeDefinitions: [
                { AttributeName: 'id', AttributeType: 'S' },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        };

        await dynamodb.createTable(dishesTableParams).promise();
        console.log('Dishes table created');

        console.log('All tables created successfully');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
}

createTables();