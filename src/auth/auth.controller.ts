import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/register')
    register(@Body(ValidationPipe) registerDto: RegisterDto): Promise<string> {
        return this.authService.register(registerDto);
    }

    @Post('/login')
    login(@Body(ValidationPipe) loginDto: LoginDto): Promise<{accessToken: string, memberName: string}>{
        return this.authService.login(loginDto);
    }
}
