import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class NotifsFilter{
    @IsOptional()
    @IsNotEmpty()
    title: string;
}