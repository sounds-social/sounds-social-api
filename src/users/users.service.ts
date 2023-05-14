import { Injectable } from '@nestjs/common';
import { kebabCase } from 'lodash';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      username: 'userOne',
      password: 'not-secure',
      slug: 'user-one'
    },
    {
      id: 2,
      username: 'userTwo',
      password: 'not-secure-two',
      slug: 'user-two'
    },
  ];

  create(createUserInput: CreateUserInput) {
    const user = {
      ...createUserInput,
      slug: kebabCase(createUserInput.username),
      id: this.users.length + 1,
    };

    this.users.push(user);

    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(slug: string) {
    return this.users.find((user) => user.slug === slug);
  }

  findOneById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
