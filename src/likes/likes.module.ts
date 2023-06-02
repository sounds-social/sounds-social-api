import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesResolver } from './likes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { SoundsModule } from 'src/sounds/sounds.module';
import { User } from 'src/users/entities/user.entity';
import { Sound } from 'src/sounds/entities/sound.entity';
import { LikeEntity } from './entities/like-entity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeEntity]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Sound]),
    UsersModule,
    SoundsModule 
  ],
  providers: [LikesResolver, LikesService]
})
export class LikesModule {}
