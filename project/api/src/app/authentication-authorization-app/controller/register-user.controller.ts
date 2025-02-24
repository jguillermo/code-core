import { Body, Controller, Post } from '@nestjs/common';
import { UserRegister } from '@bounded-context/authentication-authorization';
import { CreateUserDto } from '../create-user.dto';

@Controller('register-user')
export class RegisterUserController {
  constructor(private readonly userRegister: UserRegister) {}
  @Post()
  async registerUser(@Body() dto: CreateUserDto) {
    await this.userRegister.execute(dto as any);
  }
}
