import { Module } from '@nestjs/common';
import { SoundsService } from './sounds.service';
import { SoundsResolver } from './sounds.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sound } from './entities/sound.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { LikeEntity } from 'src/likes/entities/like-entity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sound]), 
    TypeOrmModule.forFeature([LikeEntity]),
    UsersModule,
  ],
  providers: [SoundsResolver, SoundsService],
  exports: [SoundsService],
})
export class SoundsModule {}
