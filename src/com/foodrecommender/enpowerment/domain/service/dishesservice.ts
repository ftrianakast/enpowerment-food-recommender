import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { Dish } from '@model/dish';

@Injectable()
export class DishesService {
  private readonly dynamoDb: DynamoDB.DocumentClient;

  constructor() {
    this.dynamoDb = new DynamoDB.DocumentClient();
  }

  async getDishes(): Promise<Dish[]> {
    const params = {
      TableName: 'Dishes',
      ProjectionExpression: 'id, name, cuisine, ingredients',
    };

    const result = await this.dynamoDb.scan(params).promise();

    return result.Items as Dish[];
  }
}