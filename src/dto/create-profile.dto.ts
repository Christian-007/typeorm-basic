import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Gender } from '../enums/gender.enum';

export class CreateProfileDto {
  @IsOptional()
  @IsEnum(Gender)
  gender?: string;

  @IsOptional()
  @IsString()
  photo?: string;
}
