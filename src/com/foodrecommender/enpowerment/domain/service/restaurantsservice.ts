import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { Restaurant } from 'src/com/foodrecommender/enpowerment/domain/model/restaurant';
import { configureDynamoDB } from '@infrastructure/dynamo.config';

@Injectable()
export class RestaurantsService {
  private readonly dynamoDb: DynamoDB.DocumentClient;

  constructor() {
    configureDynamoDB();
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