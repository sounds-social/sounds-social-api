import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { kebabCase, uniqueId } from 'lodash';
import { SoundsService } from 'src/sounds/sounds.service';
import { UploadsService } from './uploads.service';

@Controller('upload')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly soundsService: SoundsService
  ) {}

  @Post('sound')
  @UseInterceptors(FileInterceptor('file'))
  uploadSound(
    @UploadedFile() file: Express.Multer.File,
    @Body() body
    ) {
      const uniqueFilename = `${Date.now()}${file.originalname}`

      this.uploadsService.uploadFile(
        uniqueFilename,
        file.buffer
      )

      const createdSound = this.soundsService.create({
        title: body.title,
        slug: kebabCase(body.title),
        uri: `http://localhost:3000/${uniqueFilename}`
      })

      return {
        sound: createdSound,
        message: "Successfully uploaded Sound"
      };
  }
}
