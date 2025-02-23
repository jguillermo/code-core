import { Body, Controller, Post } from '@nestjs/common';
import { UserRegister } from '@bounded-context/authentication-authorization';
import { UserRegisterDto } from '@bounded-context/authentication-authorization/src';

@Controller('register-user')
export class RegisterUserController {
  constructor(private readonly userRegister: UserRegister) {}
  @Post()
  async registerUser(@Body() dto: UserRegisterDto) {
    return this.userRegister.execute(dto);
  }
}
