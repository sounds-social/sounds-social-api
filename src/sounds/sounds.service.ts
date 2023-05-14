import { Injectable } from '@nestjs/common';
import { kebabCase } from 'lodash';
import { CreateSoundInput } from './dto/create-sound.input';
import { UpdateSoundInput } from './dto/update-sound.input';

const generateMockSound = (id: number) => ({
  id, 
  title: `Track Number ${id}`, 
  slug: kebabCase(`Track Number ${id}`),
  uri: 'https://wavesurfer-js.org/example/media/demo.wav',
  owner: {
    id,
    username: `skrillex${id}`,
    displayName: `Skrillex ${id}`, 
    slug: kebabCase(`Skrillex ${id}`)
  },
})

@Injectable()
export class SoundsService {
  private sounds = [
    generateMockSound(1),
    generateMockSound(2),
    generateMockSound(3),
    generateMockSound(4),
    generateMockSound(5),
    generateMockSound(6)
  ];

  create(createSoundInput: CreateSoundInput) {
    return 'This action adds a new sound';
  }

  findAll() {
    return this.sounds;
  }

  findOne(slug: string) {
    return this.sounds.find(sound => sound.slug === slug);
  }

  update(id: number, updateSoundInput: UpdateSoundInput) {
    return `This action updates a #${id} sound`;
  }

  remove(id: number) {
    return `This action removes a #${id} sound`;
  }
}
