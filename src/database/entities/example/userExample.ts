import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { RoleEnum } from '../../../enums/role.enum';

@Entity('users_example')
export class UserExample {
  // Main colum
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  userName: string;

  @Column('text', { unique: true })
  email: string;

  @Column('enum', {
    enum: [...Object.values(RoleEnum)],
    nullable: true,
    default: RoleEnum.USER,
  })
  role: RoleEnum;

  @Column('text', {
    select:
      false /*controls whether the column should be included in the results of a query by default.
      If you need to retrieve the password field in a query, you have to explicitly specify it in your
      query using the addSelect method.*/,
  })
  password: string;

  @Column('text', { nullable: true })
  firstName?: string;

  @Column('text', { nullable: true })
  lastName?: string;

  @Column('date', { nullable: true })
  birthday?: Date;

  @Column('text', { nullable: true })
  phone?: string;

  @Column('boolean', { default: false })
  verified: boolean;
}
