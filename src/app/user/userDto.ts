import { IsEmail , Matches , Length } from 'class-validator';
import { users } from './user.model';

export class UserDto {

  @Length(5, 20, { message: 'Name should be at least 5 characters long , max 20' })
  name: string;

  
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: 'Password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character. It must be at least 8 characters long.' })
  password: string;


}

export class PartialUpdateUserDto{
  @Length(5, 20, { message: 'Name should be at least 5 characters long , max 20' })
  name: string;

  
  // @IsEmail({}, { message: 'Invalid email format' })
  // email: string;
}
