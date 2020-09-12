import { IsNotEmpty, IsNumber, IsDate, IsString } from "class-validator";

export class NotifsDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    body: string;

    @IsNotEmpty()
    @IsNumber()
    sendersId: number;

    @IsNotEmpty()
    @IsNumber()
    receiversId: number;
    
}