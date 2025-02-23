import { Body, Controller, Post } from '@nestjs/common';
import {
  UserRegister,
  UserRegisterDto,
} from '@bounded-context/authentication-authorization';

@Controller('register-user')
export class RegisterUserController {
  constructor(private readonly userRegister: UserRegister) {}
  @Post()
  async registerUser(@Body() dto: UserRegisterDto) {
    await this.userRegister.execute(dto);
  }
}
