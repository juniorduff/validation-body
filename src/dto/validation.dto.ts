import {IsNotEmpty, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
class ChildrenDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    age: string;
}
class  ValidationDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @Type(() => ChildrenDto)
    @IsNotEmpty()
    @ValidateNested( {each: true})

    children:ChildrenDto;

}


export { ValidationDto };
