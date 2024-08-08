import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Profile } from 'src/models/profile.entity';
import { ProfileService } from './profile.service';
import { ProfileDTO } from 'src/models/dtos/profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get()
  async getAll(): Promise<Profile[]> {
    return await this.profileService.findAll();
  }

  @Put(':email')
  async update(
    @Param('email') email: string,
    @Body() profileDTo: ProfileDTO,
  ): Promise<Profile> {
    return await this.profileService.update(email, profileDTo);
  }
}

/* 
async findAll(): Promise<UserProfileDTO[]> {
    const users = await this.userRepository.find({ relations: ['profile'] });
    return users.map(user => ({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      birthdate: user.profile?.birthdate,
      phone: user.profile?.phone,
      gender: user.profile?.gender,
    }));
  }
*/
