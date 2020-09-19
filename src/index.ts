import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { registerDependencyInjections } from './di-container';
import { ProfilesController } from './controllers/profiles.controller';
import { UsersController } from './controllers/users.controller';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { validationMiddleware } from './middlewares/validation.middleware';

createConnection()
  .then(async () => {
    // Initialise provider values
    const { usersService, profilesService } = registerDependencyInjections();

    // User use case
    const mockCreateUserDto: CreateUserDto = {
      firstName: 'Kruzier',
      lastName: 'Hast',
      age: 28,
      profile: {
        gender: 'male',
        photo: 'kruzier.jpg',
      },
    };

    try {
      await validationMiddleware(CreateUserDto, mockCreateUserDto);
      const usersController = new UsersController(usersService, profilesService);
      const createdUser = await usersController.create(mockCreateUserDto);
      console.log('createdUser: ', createdUser);
    } catch (error) {
      const response = {
        statusCode: error.status,
        message: error.message.split(','),
      };
      console.log(response);
    }
  })
  .catch((error) => console.log('index error: ', error));
