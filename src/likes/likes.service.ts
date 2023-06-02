import { Injectable } from '@nestjs/common';
import { CreateLikeInput } from './dto/create-like.input';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeEntity } from './entities/like-entity.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Sound } from 'src/sounds/entities/sound.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity) private likeRepository: Repository<LikeEntity>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Sound) private soundRepository: Repository<Sound>,
  ) {}

  async like(createLikeInput: CreateLikeInput, userId: number) {
    const soundId = createLikeInput.soundId

    const existingLike = await this.likeRepository.findOne({
      relations: {
        sound: true,
        user: true,
      },
      where: { 
        user: {
          id: userId
        },
        sound: {
          id: soundId
        },
      }
    });

    if (existingLike) {
      return existingLike
    }

    const newLike = new LikeEntity()

    const sound = await this.soundRepository.findOneBy({
      id: soundId
    })

    const user = await this.userRepository.findOneBy({
      id: userId
    })

    newLike.sound = sound;
    newLike.user = user;

    return await this.likeRepository.save(newLike);

  }

  async remove(soundId: number, userId: number) {
    const like = await this.likeRepository.findOne({
      relations: {
        sound: true,
        user: true,
      },
      where: { 
        sound: {
          id: soundId
        },
        user: {
          id: userId
        },
      }
    });


    console.log(like)
    await this.likeRepository.softRemove(like);

    return like;
  }
}
