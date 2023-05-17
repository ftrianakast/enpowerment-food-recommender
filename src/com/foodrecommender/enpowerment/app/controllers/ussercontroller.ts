import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { User } from '@model/User';
import { UserService } from '@service/UserService';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}