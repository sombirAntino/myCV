import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Delete,
  Patch,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.createUser(body.email, body.password);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  findUser(@Param('id') id: string) {
    const user = this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  find() {
    return this.usersService.findAll();
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(+id, body);
  }
}
