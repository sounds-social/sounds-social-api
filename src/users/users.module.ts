import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Sound } from 'src/sounds/entities/sound.entity';
import { LikeEntity } from 'src/likes/entities/like-entity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    TypeOrmModule.forFeature([Sound]),
    TypeOrmModule.forFeature([LikeEntity])
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
