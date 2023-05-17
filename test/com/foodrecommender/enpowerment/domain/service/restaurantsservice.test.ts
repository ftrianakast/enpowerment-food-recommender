import { Test, TestingModule } from '@nestjs/testing';
import { DynamoDB } from 'aws-sdk';
import { RestaurantsService } from '../../../../../../src/com/foodrecommender/enpowerment/domain/service/restaurantsservice';

// Mock the aws-sdk
const expectedRestaurants = [
    {
        id: '1',
        name: 'Restaurant A',
        cuisine: 'Italian',
        dishes: ['dish1', 'dish2'],
    },
    {
        id: '2',
        name: 'Restaurant B',
        cuisine: 'Japanese',
        dishes: ['dish3', 'dish4'],
    },
];


jest.mock('aws-sdk', () => {
    const putMock = jest.fn().mockReturnValue({ promise: jest.fn() });
    const getMock = jest.fn().mockReturnValue({ promise: jest.fn() });
    const updateMock = jest.fn().mockReturnValue({ promise: jest.fn() });
    const deleteMock = jest.fn().mockReturnValue({ promise: jest.fn() });
    const scanMock = jest.fn().mockImplementation(() => ({
        promise: jest.fn().mockResolvedValue({ Items: expectedRestaurants }),
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

describe('RestaurantsService', () => {
    let service: RestaurantsService;
    let documentClientMock: jest.Mocked<DynamoDB.DocumentClient>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RestaurantsService,
                {
                    provide: DynamoDB.DocumentClient,
                    useClass: DynamoDB.DocumentClient as jest.Mock,
                },
            ],
        }).compile();

        service = module.get<RestaurantsService>(RestaurantsService);
        documentClientMock = module.get(DynamoDB.DocumentClient);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve restaurants from DynamoDB', async () => {

        const restaurants = await service.getRestaurants();

        expect(documentClientMock.scan).toHaveBeenCalledTimes(1);
        expect(documentClientMock.scan).toHaveBeenCalledWith({
            TableName: 'Restaurants',
            ProjectionExpression: 'id, name, cuisine, dishes',
        });
        expect(restaurants).toEqual(expectedRestaurants);
    });
});