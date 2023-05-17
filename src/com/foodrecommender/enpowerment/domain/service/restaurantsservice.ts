import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class RestaurantsService {
  private readonly dynamoDb: DynamoDB.DocumentClient;

  constructor() {
    this.dynamoDb = new DynamoDB.DocumentClient();
  }

  async getRestaurants(): Promise<Restaurant[]> {
    const params = {
      TableName: 'Restaurants',
      ProjectionExpression: 'id, name, cuisine, dishes',
    };

    const result = await this.dynamoDb.scan(params).promise();

    return result.Items as Restaurant[];
  }
}