import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadsService {
  uploadFile(fileName: string, buffer: Buffer) {
    const path = join(
      __dirname, 
      '../..', 
      'static/', 
      fileName,
    )

    writeFileSync(path, buffer)
  }
}
