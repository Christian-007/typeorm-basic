import { User } from '../entity/user.entity';
import { Profile } from '../entity/profile.entity';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfilesService } from '../services/profiles.service';

export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  async create(createProfileDto: CreateProfileDto, selectedUser: User): Promise<Profile> {
    const createdProfile = await this.profilesService.create(createProfileDto, selectedUser);
    return createdProfile;
  }
}
