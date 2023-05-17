import { DynamoDB } from 'aws-sdk';
import { UserService } from '../src/com/foodrecommender/enpowerment/domain/service/UserService';

// Mock the aws-sdk
jest.mock('aws-sdk', () => {
  const putMock = jest.fn().mockReturnValue({ promise: jest.fn() });
  const getMock = jest.fn().mockReturnValue({ promise: jest.fn() });
  const updateMock = jest.fn().mockReturnValue({ promise: jest.fn() });
  const deleteMock = jest.fn().mockReturnValue({ promise: jest.fn() });

  const documentClientMock = jest.fn().mockImplementation(() => ({
    put: putMock,
    get: getMock,
    update: updateMock,
    delete: deleteMock,
  }));

  return {
    DynamoDB: {
      DocumentClient: documentClientMock,
    },
  };
});

describe('UserService', () => {
  let userService: UserService;
  let dynamoDb: DynamoDB.DocumentClient;

  beforeEach(() => {
    userService = new UserService();
    dynamoDb = new DynamoDB.DocumentClient();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user', async () => {
    const user = {
      id: '123',
      name: 'John Doe',
      foodPreferences: ['Italian', 'Mexican'],
      allergies: ['Nuts'],
    };

    const putMock = dynamoDb.put as jest.Mock;
    putMock.mockImplementationOnce(() => ({
      promise: jest.fn().mockResolvedValueOnce(undefined),
    }));

    const result = await userService.createUser(user);

    expect(putMock).toHaveBeenCalledTimes(1);
    expect(putMock).toHaveBeenCalledWith({
      TableName: 'Users',
      Item: user,
    });

    expect(result).toEqual(user);
  });

  it('should get an existing user', async () => {
    const user = {
      id: '123',
      name: 'John Doe',
      foodPreferences: ['Italian', 'Mexican'],
      allergies: ['Nuts'],
    }; 
    
    const getMock = dynamoDb.get as jest.Mock;
    
    getMock.mockImplementationOnce(() => ({
      promise: jest.fn().mockResolvedValueOnce({ Item: user }),
    }));

    const result = await userService.getUser(user.id);

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith({
      TableName: 'Users',
      Key: { id: user.id },
    });

    expect(result).toEqual(user);
  });

  it('should update an existing user', async () => {
    const id = '123';
    const updatedUser = {
      id,
      name: 'Updated Name',
      foodPreferences: ['Italian', 'Mexican'],
      allergies: ['Nuts'],
    }; 
    
    const updateMock = dynamoDb.update as jest.Mock;
    
    updateMock.mockImplementationOnce(() => ({
      promise: jest.fn().mockResolvedValueOnce({ Attributes: updatedUser }),
    }));

    const result = await userService.updateUser(id, updatedUser);

    expect(updateMock).toHaveBeenCalledTimes(1);
    expect(updateMock).toHaveBeenCalledWith({
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
      UpdateExpression:
        'SET #name = :name, #foodPreferences = :foodPreferences, #allergies = :allergies',
      ReturnValues: 'ALL_NEW',
    });

    expect(result).toEqual(updatedUser);
  });

  it('should delete an existing user', async () => {
    const id = '123';

    const deleteMock = dynamoDb.delete as jest.Mock;
    deleteMock.mockImplementationOnce(() => ({
      promise: jest.fn().mockResolvedValueOnce(undefined),
    }));

    await userService.deleteUser(id);

    expect(deleteMock).toHaveBeenCalledTimes(1);
    expect(deleteMock).toHaveBeenCalledWith({
      TableName: 'Users',
      Key: { id },
    });
  });
});  