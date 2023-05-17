import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../../../../../src/com/foodrecommender/enpowerment/app/controllers/ussercontroller';
import { UserService } from '../../../../../../src/com/foodrecommender/enpowerment/domain/service/userservice';
import { User } from '../../../../../../src/com/foodrecommender/enpowerment/domain/model/user';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UserService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UserService>(UserService);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const user: User = { id: '1', name: 'Chapulin', foodPreferences: ["italian"], allergies: [] };

      jest
        .spyOn(userService, 'createUser')
        .mockImplementation(async () => user);

      const result = await controller.createUser(user);

      expect(result).toEqual(user);
    });
  });

  describe('getUser', () => {
    it('should get a user by ID', async () => {
      const user: User = { id: '1', name: 'Chapulin', foodPreferences: ["italian"], allergies: []  };

      jest.spyOn(userService, 'getUser').mockImplementation(async () => user);

      const result = await controller.getUser('1');

      expect(result).toEqual(user);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const user: User = { id: '1', name: 'Chapulin', foodPreferences: ["italian"], allergies: []  };

      jest
        .spyOn(userService, 'updateUser')
        .mockImplementation(async () => user);

      const result = await controller.updateUser('1', user);

      expect(result).toEqual(user);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      jest.spyOn(userService, 'deleteUser').mockImplementation(async () => {});

      const result = await controller.deleteUser('1');

      expect(result).toBeUndefined();
    });
  });
});