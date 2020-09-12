import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { NotifsFilter } from "./dto/notification-filter.dto";
import { NotifsDto } from "./dto/notification.dto";
import { Notifs } from "./notification.entity";

@EntityRepository(Notifs)
export class NotificationRepository extends Repository<Notifs>{
    

    async sendNotification(notifsDto: NotifsDto, user: User):Promise<Notifs> {
        const {title, body, receiversId, sendersId } = notifsDto;

        const notifs = new Notifs();
        notifs.title = title;
        notifs.body = body;
        notifs.receiversId = receiversId;
        notifs.sendersId = sendersId;
        notifs.timestamp = new Date();
        notifs.user = user;
        
        await notifs.save();
        console.log(title);

        delete notifs.user.password;
        delete notifs.user.salt;
        delete notifs.user.notifs;
           
        return notifs;
    }

    async getNotification(notifsFilterDto: NotifsFilter, user: User):Promise<Notifs[]>{
        //destructuring title from notifs filter
        const {title} = notifsFilterDto;

        //creating a queryBuilder that interracts with the notifs table
        const query = this.createQueryBuilder('notifs');

        query.where('notifs.userId = :userId', {userId: user.id})

        //filtering based on title
        if (title) {
            //andWhere used in both if statements so as to prevent overriding as where > any other where clause
            //LIKE is same thing as = but with more flexibility as it makes provision for whitespaces
            //partial search is done by wrapping the variable in the %sign
            query.andWhere('notifs.title LIKE :title', { title: `%${title}%` });
        }

        //execute the query
        const notifs = await query.getMany();
        return notifs;
    }
}