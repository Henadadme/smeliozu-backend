import {IsString, IsNotEmpty, MinLength, MaxLength, IsNumber, Matches, IsEmail} from 'class-validator';
export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(50)
    memberName: string;

    @IsNotEmpty()
    @IsNumber()
    @MinLength(11)
    phoneNumber: number;

    @IsNotEmpty()
    @IsString()
    homeAddress: string;

    @IsString()
    @IsNotEmpty()
    localGovt: string;

    @IsString()
    @IsNotEmpty()
    kinName: string;

    @IsString()
    @IsNotEmpty()
    kinAddress: string;

    @IsNotEmpty()
    @IsNumber()
    @MinLength(11)
    kinPhone: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Password must contain 1 Uppercase, 1 lowercase, 1 number and 1 special character' },)
    password: string;
}