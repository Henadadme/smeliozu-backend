import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { NotifsFilter } from './dto/notification-filter.dto';
import { NotifsDto } from './dto/notification.dto';
import { Notifs } from './notification.entity';
import { NotificationService } from './notification.service';

@Controller('notification')
@UseGuards(AuthGuard())
export class NotificationController {
    constructor(private notifService: NotificationService) {}

    @Post()
    @UsePipes(ValidationPipe)
    sendNotifs(@Body() notifsDto: NotifsDto, @GetUser()user: User): Promise<Notifs>{
        return this.notifService.sendNotification(notifsDto, user);
    }

    @Get()
    getNotifs(
        @Query(ValidationPipe) notifsFilterDto: NotifsFilter, 
        @GetUser() user: User): Promise<Notifs[]>{
            return this.notifService.getNotification(notifsFilterDto, user);
    }
}