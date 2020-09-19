import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';

import { Profile } from '../entity/profile.entity';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfilesService } from '../services/profiles.service';

export class UsersController {
  constructor(private usersService: UsersService, private profilesService: ProfilesService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.usersService.create(createUserDto);
    const hasProfile = !!createUserDto.profile;

    if (hasProfile) {
      await this.profilesService.create(createUserDto.profile, createdUser);
    }

    return createdUser;
  }

  async createProfile(createProfileDto: CreateProfileDto, userId: number): Promise<Profile> {
    const foundUser = await this.usersService.findOne(userId);
    const createdProfile = await this.profilesService.create(createProfileDto, foundUser);

    return createdProfile;
  }
}
