import { Controller, Get } from '@nestjs/common';
import { Profile } from 'src/models/profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get()
  async getAll(): Promise<Profile[]> {
    return await this.profileService.findAll();
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