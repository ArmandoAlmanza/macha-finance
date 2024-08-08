import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Profile } from 'src/models/profile.entity';
import { Transaction } from 'src/models/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Profile]),
    TypeOrmModule.forFeature([Transaction]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
