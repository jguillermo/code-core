export class CreateUserDto {
  email: string;
  password: string;
  roles: string[] = [];
  isEnabled?: boolean = true;
}
