import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { CreateProfileDto } from './create-profile.dto';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  @Min(18)
  @Max(70)
  age: number;

  @IsOptional()
  @Type(() => CreateProfileDto)
  @ValidateNested()
  profile?: CreateProfileDto;
}
