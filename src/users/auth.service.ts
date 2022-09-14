/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // check the use exist this email
    const isUserExist = await this.userService.findOneByEmail(email);
    if (isUserExist) {
      throw new BadRequestException('User already exist...');
    }

    // Hash the user password

    const encryptedPassword = await hash(password, 10);

    // Create the new user and save

    const newUser = await this.userService.createUser(email, encryptedPassword);

    // return new user

    return newUser;
  }

  async signin(email: string, password: string) {
    // check the use exist this email
    const isUserExist = await this.userService.findOneByEmail(email);
    if (!isUserExist) {
      throw new NotFoundException('User not found...');
    }

    // Compare the password

    const checkPassword = compare(password, isUserExist.password);
    if (!checkPassword) {
      throw new BadRequestException('Incorrect Password! try again');
    }

    // return { userData: isUserExist, message: 'Succesfully Logged In' };
    return isUserExist;
  }
}
