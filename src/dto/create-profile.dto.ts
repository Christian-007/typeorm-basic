import { IsEnum, IsString } from 'class-validator';
import { Gender } from '../enums/gender.enum';

export class CreateProfileDto {
  @IsEnum(Gender)
  gender: string;

  @IsString()
  photo: string;
}
