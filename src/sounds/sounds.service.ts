import { Injectable } from '@nestjs/common';
import { kebabCase } from 'lodash';
import { CreateSoundInput } from './dto/create-sound.input';
import { UpdateSoundInput } from './dto/update-sound.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Sound } from './entities/sound.entity';
import { Repository } from 'typeorm';
import { LikeEntity } from 'src/likes/entities/like-entity.entity';

@Injectable()
export class SoundsService {
  constructor(
    @InjectRepository(Sound) private soundRepository: Repository<Sound>,
    @InjectRepository(LikeEntity) private likeRepository: Repository<LikeEntity>
  ) {}

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

    return await this.soundRepository.save(newSound);
  }

  async findAll() {
    return await this.soundRepository
      .createQueryBuilder('sound')
      .orderBy('sound.createdAt', 'DESC')
      .getMany()
  }

  async findLikesForUser(soundId: number) {
    return await this.likeRepository.find({
      relations: {
        sound: true,
        user: true,
      },
      where: { 
        sound: {
          id: soundId
        },
      }
    });
  }

  async findOne(slug: string) {
    return await this.soundRepository.findOneBy({
      slug
    });
  }

  async addPlayCount(slug: string) {
    const sound = await this.soundRepository.findOneBy({
      slug
    })

    if (sound) {
      if (!sound.playCount) {
        sound.playCount = 0
      }

      sound.playCount = sound.playCount + 1

      return await this.soundRepository.save(sound);
    }
  }

  async editCoverImage(id: number, coverUri: string, userId: number) {
    const sound = await this.soundRepository.findOneBy({
      id
    })

    if (sound.ownerId !== userId) {
      throw new Error('Owner doesnt match logged in user');
    }

    sound.coverUri = coverUri

    return await this.soundRepository.save(sound);
  }

  update(id: number, updateSoundInput: UpdateSoundInput) {
    return `This action updates a #${id} sound`;
  }

  async remove(id: number) {
    const sound = await this.soundRepository.findOneBy({
      id
    });

    const likes = await this.findLikesForUser(id);

    for (const like of likes) {
      await this.likeRepository.softRemove(like);
    }

    await this.soundRepository.softRemove(sound);

    return sound;
  }
}
