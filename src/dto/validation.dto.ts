import {IsNotEmpty, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
class ChildrenDto2 {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    age: string;
}
class ChildrenDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    age: string;
    @Type(() => ChildrenDto)
    @IsNotEmpty()
    @ValidateNested( {each: true})
    children:ChildrenDto2



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
