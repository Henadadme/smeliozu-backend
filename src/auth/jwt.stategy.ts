import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        //retrieve user based on memberName
        const {memberName} = payload;
        const user = await this.userRepository.findOne({memberName});
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}