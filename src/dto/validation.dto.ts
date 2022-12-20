import {IsNotEmpty, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
class OtherObject {
    @IsString()
    @IsNotEmpty()
    value: string;
}
class ChildrenDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    age: string;
    @Type(() => ChildrenDto)
    @IsOptional()
    @ValidateNested( {each: false})
    object:OtherObject
}

class  ValidationDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @Type(() => ChildrenDto)
    @IsNotEmpty()
    @ValidateNested( {each: false})

    children:ChildrenDto;
}


export { ValidationDto };