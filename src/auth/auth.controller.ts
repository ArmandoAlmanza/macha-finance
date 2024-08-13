import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO, UserLogin } from 'src/models/dtos/user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async register(@Body() userDto: UserDTO) {
    return await this.authService.register(userDto);
  }
  @Post(':email')
  async login(
    @Body() user: UserLogin,
    @Param('email') email: string,
    @Res() res: Response,
  ) {
    const response = await this.authService.login(user, email);
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
    return user;
  }
}
