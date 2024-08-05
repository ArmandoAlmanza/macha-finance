import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'birthdate' })
  birthdate: Date;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'gender' })
  gender: string;

  @Column({ name: 'user_email', type: 'varchar', length: 50 })
  userEmail: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_email', referencedColumnName: 'email' })
  user: User;
}
