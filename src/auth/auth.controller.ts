import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/register')
    signUp(@Body(ValidationPipe) registerDto: RegisterDto): Promise<string> {
        return this.authService.register(registerDto);
    }
}
