import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { kebabCase } from 'lodash';
import { SoundsService } from 'src/sounds/sounds.service';
import { UploadsService } from './uploads.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('upload')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly soundsService: SoundsService
  ) {}

  @Post('sound')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  async uploadSound(
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
    @Req() request 
    ) {
      const uniqueFilename = `${Date.now()}${file.originalname}`

      this.uploadsService.uploadFile(
        uniqueFilename,
        file.buffer
      )

      const createdSound = await this.soundsService.create({
        title: body.title,
        slug: kebabCase(body.title),
        uri: `http://localhost:3000/${uniqueFilename}`
      }, request.user.userId)

      return {
        sound: createdSound,
        message: "Successfully uploaded Sound"
      };
  }
}
