import { getRepository } from 'typeorm';

import { User } from './entity/user.entity';
import { UsersService } from './services/users.service';
import { Profile } from './entity/profile.entity';
import { ProfilesService } from './services/profiles.service';

export function registerDependencyInjections() {
  const usersRepository = getRepository(User);
  const usersService = new UsersService(usersRepository);

  const profilesRepository = getRepository(Profile);
  const profilesService = new ProfilesService(profilesRepository);

  return { usersService, profilesService };
}
