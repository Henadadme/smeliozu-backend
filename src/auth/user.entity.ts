import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Notifs } from "src/notification/notification.entity";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    memberName: string;

    @Column()
    phoneNumber: string;

    @Column()
    homeAddress: string;

    @Column()
    localGovt: string;

    @Column()
    kinName: string;

    @Column()
    kinAddress: string;

    @Column()
    kinPhone: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Notifs, notifs => notifs.user, {eager:true})
    notifs: Notifs[];


    //using custom method to validate username and password
    async validatePassword(password: string): Promise<boolean> {
        //retrieve the password from the request body
        //apply same hash against the original user salt
        //compare the result hash with the actual user password hash
        //if match=== true, else==false
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}