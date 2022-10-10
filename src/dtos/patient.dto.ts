import { IsString, IsEmail, IsDate, isDate } from "class-validator";

export class CreatePatientDto {
  @IsString()
  public name: string | undefined;

  @IsEmail()
  public email: string | undefined;

  @IsString()
  public contact: string | undefined;

  @IsString()
  public dob: Date | undefined;

  
  public address: string | undefined;


  public file: string | undefined;
}
