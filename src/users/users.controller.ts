import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, UserLogin } from 'src/models/dtos/user.dto';
import { Response } from 'express';

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

  @Delete(':email')
  async delete(@Param('email') email: string, @Res() res: Response) {
    const response = await this.userService.delete(email);
    if (response != 200) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        status: 'Unauthorized',
        message: 'Invalid Credentials',
      });
    }
    res.status(HttpStatus.OK).json({
      status: 'ok',
      message: 'Logged',
    });
  }

  @Put(':email')
  async update(@Param('email') email: string, @Body() userDto: UserDTO) {
    return await this.userService.update(email, userDto);
  }
  
}
