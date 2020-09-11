import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { GetUserDto } from "./dto/get-user.dto";

@EntityRepository(User)
export class UsersRepository extends Repository<User>{
    async getUsers(getUserDto: GetUserDto, user: User): Promise<User[]>{
        //destruct
        const {memberName} = getUserDto;

        //create query builder
        const query = this.createQueryBuilder('user');

        //query statement
        query.where('user.id = :id', {id : user.id})

        //filtering based on memberName
        if (memberName) {
            //andWhere used in both if statements so as to prevent overriding as where > any other where clause
            //LIKE is same thing as = but with more flexibility as it makes provision for whitespaces
            //partial search is done by wrapping the variable in the %sign
            query.andWhere('user.memberName LIKE :memberName ', { memberName: `%${memberName}%` });
        }

        //executing the query
        const users = await query.getMany();
        return users;
    }
}