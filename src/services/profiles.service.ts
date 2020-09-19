import { Repository } from 'typeorm';

import { Profile } from '../entity/profile.entity';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { User } from '../entity/user.entity';

export class ProfilesService {
  constructor(private profilesRepository: Repository<Profile>) {}

  async create(createProfileDto: CreateProfileDto, selectedUser: User): Promise<Profile> {
    const profile = new Profile();
    profile.gender = createProfileDto.gender;
    profile.photo = createProfileDto.photo;
    profile.user = selectedUser;

    const hasProfile = !!selectedUser.profile;
    if (hasProfile) {
      profile.id = selectedUser.profile.id;
    }

    try {
      const createdProfile = await this.profilesRepository.save(profile);
      return createdProfile;
    } catch (error) {
      throw new Error(`ProfilesService.create error: ${error}`);
    }
  }
}
