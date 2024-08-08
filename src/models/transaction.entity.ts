import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

enum TransactionType {
  INGRESO = 'ingreso',
  GASTO = 'gasto',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_email', type: 'varchar', length: 50 })
  userEmail: string;

  @Column({ name: 'type', type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column('decimal', { name: 'mount', precision: 10, scale: 2 })
  amount: number;

  @Column({ name: 'currency' })
  currency: string;

  @Column({ name: 'concept', length: 255, default: 'Cash deposit' })
  concept: string;

  @Column({ name: 'trans_date' })
  date: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_email', referencedColumnName: 'email' })
  user: User;
}
