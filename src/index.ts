import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { registerDependencyInjections } from './di-container';
import { ProfilesController } from './controllers/profiles.controller';
import { UsersController } from './controllers/users.controller';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';

createConnection()
  .then(async () => {
    // Initialise provider values
    const { usersService, profilesService } = registerDependencyInjections();

    // User use case
    const mockCreateUserDto: CreateUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      age: 20,
    };
    const usersController = new UsersController(usersService);
    const createdUser = await usersController.create(mockCreateUserDto);
    console.log('createdUser: ', createdUser);

    // Profile use case
    const mockCreateProfileDto: CreateProfileDto = {
      gender: 'male',
      photo: 'hello.jpg',
    };
    const profilesController = new ProfilesController(profilesService);
    const createdProfile = await profilesController.create(mockCreateProfileDto, createdUser);
    console.log('createdProfile: ', createdProfile);
  })
  .catch((error) => console.log('index error: ', error));
