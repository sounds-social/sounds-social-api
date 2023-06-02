import { Injectable } from '@nestjs/common';
import { kebabCase } from 'lodash';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Sound } from 'src/sounds/entities/sound.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Sound) private soundRepository: Repository<Sound>
  ) {}

  async create(createUserInput: CreateUserInput) {
    const newUser = this.userRepository.create({
      ...createUserInput,
      slug: kebabCase(createUserInput.username),
    });

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

  async findSoundsForUser(id: number) {
    return await this.soundRepository
      .createQueryBuilder('sound')
      .where({ ownerId: id })
      .orderBy('sound.createdAt', 'DESC')
      .getMany();
  }
}
