import { Injectable } from '@nestjs/common';
import { kebabCase } from 'lodash';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  private users = [/*
    {
      id: 1,
      username: 'userOne',
      password: 'not-secure',
      slug: 'user-one',
      displayName: "User One"
    },
    {
      id: 2,
      username: 'userTwo',
      password: 'not-secure-two',
      slug: 'user-two',
    },
  */];

  async create(createUserInput: CreateUserInput) {
    const newUser = this.userRepository.create({
      ...createUserInput,
      slug: kebabCase(createUserInput.username),
    });

    console.log(newUser);

    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(slug: string) {
    return await this.userRepository.findOneBy({
      slug
    });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOneBy({
      id
    });
  }
}
