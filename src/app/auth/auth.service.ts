import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as jwt from "jsonwebtoken";
import configs from 'src/Utils/environment/config';
import Email from 'src/Utils/InternalService/EmailService';
import {UserDto} from 'src/app/user/userDto';
import * as bcrypt from 'bcrypt';
import { CustomException } from 'src/Utils/custom-exception';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(body: any): Promise<void> {
    await this.userService.create(body);
  }

  async login(body: any): Promise<{accessToken:string,exp:number,refreshToken:string}> {
    const find = await this.findByEmailAndPassword(body.email);
    if(!find)throw new CustomException("email not found");
    const checkPassword = await this.isVerfiyPassword(find,body.password);
    if(!checkPassword) throw new CustomException("passowrd or email is not correct , please double check and try again");
    
    const {accessToken,refreshToken} = this.generateToken(find.id);
    return {accessToken,exp:Math.floor(Date.now() / 1000) + 60 * 15,refreshToken};
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    const find = await this.userService.findOnebyCriteria({
        email
    });
    if(!find)throw new CustomException("user not found");
    const {accessToken} = this.generateToken(find.id);
    Email.getInstance().sendEmail({
        to:find.email,
        subject:`reset password`
    },null,`use this link to change yourpassword https://blahblah.com/change-forget-password?tmToken=${accessToken}`);
  }

  async findByEmailAndPassword(email:string){
    const result = await this.userService.findOnebyCriteria({
        email
    });
    return result;
  }

  async isVerfiyPassword(user:UserDto,enteredPassword:string){
    const verfied = await bcrypt.compare(enteredPassword,user.password);
    return verfied;
  }

  generateToken(userId:number):{accessToken:string,refreshToken:string}{
    const accessToken = jwt.sign({ userId , refresh: false, type: 'Bearer' }, configs.JWT_SECRET, { algorithm: 'HS256', expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId , refresh: true, type: 'Bearer' },configs.JWT_REFRESH_SECRET,{ algorithm: 'HS256', expiresIn: '7d' });
    return {accessToken,refreshToken};
  }

  refreshToken(wholeToken:string):{accessToken:string,exp:number}{
    if (!wholeToken) throw new CustomException("can't find token");
    const typeAndToken = wholeToken.split(' ');
    if (!typeAndToken) throw new CustomException("can't verify token");
    if(typeAndToken[0] != 'Bearer')throw new CustomException("unauthorized");
    
    let refreshToken = typeAndToken[1];
    if (!refreshToken) throw new CustomException("can't get token");
    const refreshTokenPayload = jwt.verify(refreshToken, configs.JWT_REFRESH_SECRET) as jwt.JwtPayload;
    if(!refreshTokenPayload.refresh)throw new CustomException("unauthorized");
    const {accessToken} = this.generateToken(refreshTokenPayload.userId);

    return { accessToken , exp:Math.floor(Date.now() / 1000) + 60 * 15}
  }

  async changeUserPassword({current,newPassword,newPasswordAgain},{userId}){
    const user = await this.userService.findOne(userId);
    if(!user)throw new CustomException("invalid user please contact support team support@blahblahblah.com");
    if(newPassword !== newPasswordAgain) throw new CustomException("new password and re-password must be equal");
    const checkPassword = await this.isVerfiyPassword(user,current);
    if(!checkPassword) throw new CustomException("passowrd is not correct , please double check and try again");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isPasswordValid = passwordRegex.test(newPassword);
    if(!isPasswordValid)throw new CustomException('Password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character. It must be at least 8 characters long.')
    const hashedPassword = await bcrypt.hash(newPassword, +configs.SLAT_ROUND);
    await this.userService.update(user.id,{password:hashedPassword});
  }
}
