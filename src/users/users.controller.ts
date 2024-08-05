import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/models/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /* @Get()
  async getAll(): Promise<User[]> {
    return await this.userService.findAll();
  } */

  @Get()
  async getAll() {
    return await this.userService.findAll();
  }

  @Get(':email')
  async getByEmail(@Param('email') email: string) {
    return await this.userService.findByEmail(email);
  }
}
