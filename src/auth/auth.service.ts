import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async register(registerDto: RegisterDto): Promise<string> {
        return this.userRepository.register(registerDto);
    }

    async login(loginDto: LoginDto): Promise<{accessToken: string, memberName: string}>{
        const memberName = await this.userRepository.login(loginDto);

        if (!memberName){
            throw new UnauthorizedException('Invalid Credentials');
        }

        //create payload for jwt
        const payload: JwtPayload = {memberName};
        const accessToken = await this.jwtService.sign(payload);

        return {memberName, accessToken};
    }

}
