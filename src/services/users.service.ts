import { Repository } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';
import { HttpException } from '../exceptions/http.exception';

export class UsersService {
  constructor(private usersRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.age = createUserDto.age;

    try {
      const createdUser = await this.usersRepository.save(user);
      return createdUser;
    } catch (error) {
      throw new Error(`UsersService.create error: ${error}`);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail(id, { relations: ['profile'] });
      return user;
    } catch (error) {
      throw new HttpException(400, error.message);
    }
  }
}
