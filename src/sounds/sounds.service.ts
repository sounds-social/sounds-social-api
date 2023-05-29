import { Injectable } from '@nestjs/common';
import { kebabCase } from 'lodash';
import { CreateSoundInput } from './dto/create-sound.input';
import { UpdateSoundInput } from './dto/update-sound.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Sound } from './entities/sound.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SoundsService {
  constructor(
    @InjectRepository(Sound) private soundRepository: Repository<Sound>
  ) {}

  private sounds = [];

  async create(createSoundInput: CreateSoundInput, userId: number) {
    let slug = createSoundInput.slug

    if (!slug) {
      slug = kebabCase(createSoundInput.title)
    }

    const newSound = this.soundRepository.create({
      title: createSoundInput.title, 
      slug,
      uri: createSoundInput.uri,
      ownerId: userId,
    });

    console.log(newSound);

    return await this.soundRepository.save(newSound);
  }

  async findAll() {
    return await this.soundRepository.find();
  }

  async findOne(slug: string) {
    return await this.sounds.find(sound => sound.slug === slug);
  }

  update(id: number, updateSoundInput: UpdateSoundInput) {
    return `This action updates a #${id} sound`;
  }

  remove(id: number) {
    return `This action removes a #${id} sound`;
  }
}
