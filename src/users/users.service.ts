import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO, UserLogin, UserProfileDTO } from 'src/models/dtos/user.dto';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // This would be for "admin" access only
  /*  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  } */

  async findAll(): Promise<UserProfileDTO[]> {
    const users = await this.userRepository.find({ relations: ['profile'] });
    return users.map((user) => ({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      birthdate: user.profile?.birthdate,
      phone: user.profile?.phone,
      gender: user.profile?.gender,
    }));
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  

  async update(email: string, currentUser: UserDTO): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    user.firstName = currentUser.firstName;
    user.lastName = currentUser.lastName;
    user.email = currentUser.email;
    try {
      this.userRepository.save(user);
      return user;
    } catch (e) {
      console.log(e);
    }
    throw new HttpException('There is a problem', HttpStatus.BAD_REQUEST);
  }

  async delete(email: string): Promise<Object> {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    this.userRepository.delete(user);
    return HttpStatus.OK; 
  }
}
