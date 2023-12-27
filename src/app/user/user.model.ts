import { BeforeCreate, BeforeUpdate, Column, Model, Table } from 'sequelize-typescript';
import { IsEmail , Matches , Length } from 'class-validator';
import * as bcrypt from 'bcrypt';
import configs from 'src/Utils/environment/config';

@Table({ tableName: 'users' })
export class users extends Model<users> {
  @Column
  @Length(5, 20, { message: 'Name should be at least 5 characters long , max 20' })
  name: string;

  @Column
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Column
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: 'Password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character. It must be at least 8 characters long.' })
  password: string;

  private static async hashPassword(instance: users){
    const hashedPassword = await bcrypt.hash(instance.password, +configs.SLAT_ROUND);
    instance.password = hashedPassword;
  }

  @BeforeCreate
  static async hashPasswordCreateEvent(instance: users): Promise<void> {
    await users.hashPassword(instance);
  }
  
  // @BeforeUpdate
  // static async hashPasswordUpdateEvent(instance: users): Promise<void> {
  //   await users.hashPassword(instance);
  // }

  toJSON(): Record<string, any> {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }
}