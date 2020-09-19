import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { registerDependencyInjections } from './di-container';
import { UsersController } from './controllers/users.controller';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { validationMiddleware } from './middlewares/validation.middleware';

createConnection()
  .then(async () => {
    // Initialise provider and controller values
    const { usersService, profilesService } = registerDependencyInjections();
    const usersController = new UsersController(usersService, profilesService);

    // User use case
    const mockCreateUserDto: CreateUserDto = {
      firstName: 'Link',
      lastName: 'Hyrule',
      age: 28,
    };

    try {
      await validationMiddleware(CreateUserDto, mockCreateUserDto);
      const createdUser = await usersController.create(mockCreateUserDto);
      console.log('createdUser: ', createdUser);
    } catch (error) {
      const response = {
        statusCode: error.status,
        message: error.message.split(','),
      };
      console.log(response);
    }

    // Profile use case
    // automatically update existing user profile if record already existed
    // otherwise, create a new profile record
    const mockCreateProfileDto: CreateProfileDto = {
      gender: 'male',
      photo: 'funny-link.jpg',
    };
    const mockUserId = 2;

    try {
      await validationMiddleware(CreateProfileDto, mockCreateProfileDto);
      const createdProfile = await usersController.createProfile(mockCreateProfileDto, mockUserId);
      console.log('createdProfile: ', createdProfile);
    } catch (error) {
      const response = {
        statusCode: error.status,
        message: error.message.split(','),
      };
      console.log(response);
    }
  })
  .catch((error) => console.log('index error: ', error));
