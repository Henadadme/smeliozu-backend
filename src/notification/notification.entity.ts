import { User } from "src/auth/user.entity";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";

@Entity()
export class Notifs extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sendersId: number;

    @Column()
    receiversId: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    userId: number;

    @ManyToOne(type => User, user => user.notifs, {eager: false})
    user: User;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;
}