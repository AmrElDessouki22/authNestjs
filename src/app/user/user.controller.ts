import { Controller, Get, Post, Param, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../Middleware/auth.middleware';
import {PartialUpdateUserDto} from './userDto';
import { users } from './user.model';
import { CustomException } from 'src/Utils/custom-exception';
import { AuthPayload } from '../Middleware/auth-payload.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

// ------------- need admin token -------------
//   @UseGuards(AuthGuard)
//   @Post()
//   create(@Body() user: UserDto): Promise<UserDto> {
//     return this.userService.create(user);
//   }
//---------------------------------------------

// ------------- need admin token -------------
//   @UseGuards(AuthGuard)
//   @Get()
//   findAll(): Promise<users[]> {
//     return this.userService.findAll();
//   }
//---------------------------------------------

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string,@AuthPayload() authPayload: any): Promise<users | null> {
    if(authPayload.userId != id) throw new CustomException('Forbidden')
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUser: PartialUpdateUserDto,@AuthPayload() authPayload: any): Promise<[number, users[]]> {
    // i removed email from userDto model i thing change email need more sucrity layer to change 
    // maybe sent to current email to take this active (change current email)
    if(authPayload.userId != id) throw new CustomException('Forbidden');
    return this.userService.update(+id, updateUser);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string,@AuthPayload() authPayload: any): Promise<number> {
    if(authPayload.userId != id) throw new CustomException('Forbidden')
    return this.userService.remove(+id);
  }
}
