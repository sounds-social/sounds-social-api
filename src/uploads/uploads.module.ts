import { Module } from '@nestjs/common';
import { SoundsModule } from 'src/sounds/sounds.module';
import { SoundsService } from 'src/sounds/sounds.service';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Module({
  imports: [
    SoundsModule
  ],
  controllers: [UploadsController],
  providers: [UploadsService]
})
export class UploadsModule {}
