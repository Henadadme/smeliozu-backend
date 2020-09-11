import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { GetUserDto } from './dto/get-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersRepository)
        private userRepository: UsersRepository,
    ) {}

    async getUsers(getUsersDto: GetUserDto, user: User):Promise<User[]>{
        return await this.userRepository.getUsers(getUsersDto, user);
    } 
}
