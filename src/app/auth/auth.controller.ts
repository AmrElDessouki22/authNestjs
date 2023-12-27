import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import {UserDto} from 'src/app/user/userDto';
import { AuthGuard } from '../Middleware/auth.middleware';
import { AuthPayload } from '../Middleware/auth-payload.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: UserDto): Promise<{ message: string }> {
    await this.authService.register(body);
    return { message: 'User registered successfully' };
  }

  @Post('login')
  async login(@Body() body: any): Promise<{ accessToken: string , refreshToken:string,exp:number }> {
    const {accessToken,exp,refreshToken} = await this.authService.login(body);
    return { accessToken , exp , refreshToken };
  }

  @UseGuards(AuthGuard)
  @Post('change-password')
  async changePassword(@Body() body: any,@AuthPayload() authPayload: any): Promise<{ message: string }> {
    await this.authService.changeUserPassword(body,authPayload);
    return { message: 'Password updated' };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: any): Promise<{ message: string }> {
    await this.authService.sendPasswordResetEmail(body.email);
    return { message: 'Password reset email sent successfully' };
  }

  @Get('refresh-token')
  async refreshToken(@Req() req: Request): Promise<{accessToken:string,exp:number}> {
    const {accessToken , exp } = this.authService.refreshToken(req.headers['x-refresh-token']);
    return { accessToken , exp };
  }
}
