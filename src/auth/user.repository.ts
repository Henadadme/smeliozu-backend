import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { RegisterDto } from "./dto/register.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async register(registerDto: RegisterDto): Promise<string>{
        const {
            memberName, phoneNumber, homeAddress, 
            localGovt, kinName, kinPhone, kinAddress, 
            email, password} = registerDto;

        const user = new User();
        user.memberName = memberName;
        user.phoneNumber = phoneNumber;
        user.homeAddress = homeAddress;
        user.localGovt = localGovt;
        user.kinName = kinName;
        user.kinPhone = kinPhone;
        user.kinAddress = kinAddress;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
            return 'User created!';
        }catch(e) {
            // console.log(e.code);
            if (e.code === '23505') {
                throw new ConflictException('Email already exists');
            }else{
                throw new InternalServerErrorException();
            }
        }
    }

    //method to hash password
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}