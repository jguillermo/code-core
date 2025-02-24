import { Body, Controller, Post } from '@nestjs/common';
import { UserRegister, UserRegisterDto } from '@bounded-context/authentication-authorization';
import { UseDto } from '../../../bounded-context/shared/decorator/use-dto.decorator';

@Controller('register-user')
@UseDto(UserRegisterDto)
export class RegisterUserController {
  constructor(private readonly userRegister: UserRegister) {}
  @Post()
  async registerUser(@Body() dto: UserRegisterDto) {
    await this.userRegister.execute(dto);
  }
}
