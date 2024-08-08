import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileDTO } from 'src/models/dtos/profile.dto';
import { Profile } from 'src/models/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async findAll(): Promise<Profile[]> {
    const profiles = await this.profileRepository.find();
    return profiles;
  }

  async findByEmail(email: string): Promise<Profile> {
    const profile = await this.profileRepository.findOneBy({
      userEmail: email,
    });
    if (!profile)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return profile;
  }

  async update(email: string, profileDTO: ProfileDTO): Promise<Profile | null> {
    const profile = await this.profileRepository.findOneBy({
      userEmail: email,
    });
    if (!profile)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    profile.birthdate = profileDTO.birthdate;
    profile.phone = profileDTO.phone;
    profile.gender = profileDTO.gender;

    try {
      this.profileRepository.save(profile);
      return profile;
    } catch (e) {
      console.log(e);
    }
    throw new HttpException('There is a problem', HttpStatus.BAD_REQUEST);
  }
}
