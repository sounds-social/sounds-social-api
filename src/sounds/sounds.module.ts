import { Module } from '@nestjs/common';
import { SoundsService } from './sounds.service';
import { SoundsResolver } from './sounds.resolver';

@Module({
  providers: [SoundsResolver, SoundsService]
})
export class SoundsModule {}
