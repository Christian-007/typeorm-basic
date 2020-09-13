import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';

export class UsersController {
  constructor(private usersService: UsersService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.usersService.create(createUserDto);
    return createdUser;
  }
}
