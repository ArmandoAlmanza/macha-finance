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
