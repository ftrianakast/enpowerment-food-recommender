import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { User } from '../model/user';

@Injectable()
export class UserService {
  private readonly dynamoDb: DynamoDB.DocumentClient;

  constructor() {
    this.dynamoDb = new DynamoDB.DocumentClient();
  }

  async createUser(user: User): Promise<User> {
    const params = {
      TableName: 'Users',
      Item: user,
    };

    await this.dynamoDb.put(params).promise();

    return user;
  }

  async getUser(id: string): Promise<User> {
    const params = {
      TableName: 'Users',
      Key: { id },
    };

    const result = await this.dynamoDb.get(params).promise();

    return result.Item as User;
  }

  async updateUser(id: string, updatedUser: User): Promise<User> {
    const params = {
      TableName: 'Users',
      Key: { id },
      ExpressionAttributeNames: {
        '#name': 'name',
        '#foodPreferences': 'foodPreferences',
        '#allergies': 'allergies',
      },
      ExpressionAttributeValues: {
        ':name': updatedUser.name,
        ':foodPreferences': updatedUser.foodPreferences,
        ':allergies': updatedUser.allergies,
      },
      UpdateExpression: 'SET #name = :name, #foodPreferences = :foodPreferences, #allergies = :allergies',
      ReturnValues: 'ALL_NEW',
    };

    const result = await this.dynamoDb.update(params).promise();

    return result.Attributes as User;
  }

  async deleteUser(id: string): Promise<void> {
    const params = {
      TableName: 'Users',
      Key: { id },
    };

    await this.dynamoDb.delete(params).promise();
  }
}