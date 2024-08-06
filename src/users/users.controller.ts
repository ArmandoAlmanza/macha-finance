import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from 'src/models/dtos/user.dto';

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

  @Post()
  async register(@Body() userDto: UserDTO) {
    return await this.userService.register(userDto);
  }

  @Get(':email')
  async getByEmail(@Param('email') email: string) {
    return await this.userService.findByEmail(email);
  }
  
  @Delete(':email')
  async delete(@Param('email') email: string) {
    return await this.userService.delete(email);
  }

  @Put(':email')
  async update(@Param('email') email: string, @Body() userDto: UserDTO) {
    return await this.userService.update(email, userDto);
  }
}
