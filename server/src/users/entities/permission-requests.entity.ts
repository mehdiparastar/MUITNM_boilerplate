import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { permissionRequestResultEnum } from 'src/enum/permissionRequestResult.enum';
import { UserRoles } from 'src/enum/userRoles.enum';

@Entity()
@Index(['role', 'user'], { unique: true })
export class PermissionRequest {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => User, (user) => user.permissionRequests)
  user: User;

  @Column({ type: 'longtext', nullable: true })
  @ApiProperty({ default: 'desc' })
  adminMsg: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    unique: true,
  })
  @ApiProperty()
  role: string;

  @Column({
    type: 'enum',
    enum: permissionRequestResultEnum,
    default: permissionRequestResultEnum.unseen,
  })
  @ApiProperty()
  result: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt?: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt?: Date;
}