import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { User } from '../entity/user.entity';

define(User, (faker: typeof Faker) => {
  // 0 = male, 1 = female
  const gender = faker.random.number(1);

  const user = new User();
  user.firstName = faker.name.firstName(gender);
  user.lastName = faker.name.lastName(gender);
  user.age = faker.random.number({ min: 15, max: 60 });

  return user;
});
