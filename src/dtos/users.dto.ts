import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public name: string | undefined;

  @IsEmail()
  public email: string | undefined;

  @IsString()
  public password: string ;

  
}

export class UserDto {
  @IsEmail()
  public email: string | undefined;

  @IsString()
  public password: string ; 
}
