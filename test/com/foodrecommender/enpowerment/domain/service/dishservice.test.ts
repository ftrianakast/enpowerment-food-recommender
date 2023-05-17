import { Test, TestingModule } from '@nestjs/testing';
import { DynamoDB } from 'aws-sdk';
import { DishesService } from '../../../../../../src/com/foodrecommender/enpowerment/domain/service/dishesservice';


const expectedDishes = [
    {
        id: '1',
        name: 'Dish A',
        cuisine: 'Italian',
        ingredients: ['ingredient1', 'ingredient2'],
    },
    {
        id: '2',
        name: 'Dish B',
        cuisine: 'Japanese',
        ingredients: ['ingredient3', 'ingredient4'],
    },
];

// Mock the aws-sdk
jest.mock('aws-sdk', () => {
    const putMock = jest.fn().mockReturnValue({ promise: jest.fn() });
    const getMock = jest.fn().mockReturnValue({ promise: jest.fn() });
    const updateMock = jest.fn().mockReturnValue({ promise: jest.fn() });
    const deleteMock = jest.fn().mockReturnValue({ promise: jest.fn() });
    const scanMock = jest.fn().mockImplementation(() => ({
        promise: jest.fn().mockResolvedValue({ Items: expectedDishes }),
    }));

    class DocumentClient {
        public put = putMock;
        public get = getMock;
        public update = updateMock;
        public delete = deleteMock;
        public scan = scanMock;
    }

    return {
        DynamoDB: {
            DocumentClient,
        },
    };
});

describe('DishesService', () => {
    let service: DishesService;
    let documentClientMock: jest.Mocked<DynamoDB.DocumentClient>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DishesService,
                {
                    provide: DynamoDB.DocumentClient,
                    useClass: DynamoDB.DocumentClient as jest.Mock,
                },
            ],
        }).compile();

        service = module.get<DishesService>(DishesService);
        documentClientMock = module.get(DynamoDB.DocumentClient);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve dishes from DynamoDB', async () => {
        const dishes = await service.getDishes();

        expect(documentClientMock.scan).toHaveBeenCalledTimes(1);
        expect(documentClientMock.scan).toHaveBeenCalledWith({
            TableName: 'Dishes',
            ProjectionExpression: 'id, name, cuisine, ingredients',
        });
        expect(dishes).toEqual(expectedDishes);
    });
});