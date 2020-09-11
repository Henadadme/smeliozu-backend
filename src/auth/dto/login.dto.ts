import {IsString, IsNotEmpty, MinLength, MaxLength, IsNumber, Matches, IsEmail} from 'class-validator';

export class LoginDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(50)
    memberName: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Password must contain 1 Uppercase, 1 lowercase, 1 number and 1 special character' },)
    password: string;
}