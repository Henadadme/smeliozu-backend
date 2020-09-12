import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { NotifsFilter } from './dto/notification-filter.dto';
import { NotifsDto } from './dto/notification.dto';
import { Notifs } from './notification.entity';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService {

    constructor(
        @InjectRepository(NotificationRepository)
        private notifsRepo: NotificationRepository){}

    async sendNotification(notifsDto: NotifsDto, user: User):Promise<Notifs> {
        return this.notifsRepo.sendNotification(notifsDto, user);
    }

    async getNotification(notifsFilter: NotifsFilter, user: User): Promise<Notifs[]>{
        return await this.notifsRepo.getNotification(notifsFilter, user);
    }
}
