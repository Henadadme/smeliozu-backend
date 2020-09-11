import { Controller, Get, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { GetUserDto } from './dto/get-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {

    constructor(
        private usersService: UsersService
    ) {}

    @Get()
    getUsers(
        @Query(ValidationPipe) getUsersDto: GetUserDto, 
        @GetUser() user: User): Promise<User[]>{
        return this.usersService.getUsers(getUsersDto, user);
    }
}
