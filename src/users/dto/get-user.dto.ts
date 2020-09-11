import { IsNotEmpty, isNotEmpty, IsOptional } from "class-validator";

export class GetUserDto {
    @IsOptional()
    @IsNotEmpty()
    memberName: string;
}