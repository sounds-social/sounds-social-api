import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SoundsService } from './sounds.service';
import { Sound } from './entities/sound.entity';
import { CreateSoundInput } from './dto/create-sound.input';
import { UpdateSoundInput } from './dto/update-sound.input';

@Resolver(() => Sound)
export class SoundsResolver {
  constructor(private readonly soundsService: SoundsService) {}

  @Mutation(() => Sound)
  createSound(@Args('createSoundInput') createSoundInput: CreateSoundInput) {
    return this.soundsService.create(createSoundInput);
  }

  @Query(() => [Sound], { name: 'sounds' })
  findAll() {
    return this.soundsService.findAll();
  }

  @Query(() => Sound, { name: 'sound' })
  findOne(@Args('slug') slug: string) {
    return this.soundsService.findOne(slug);
  }

  @Mutation(() => Sound)
  updateSound(@Args('updateSoundInput') updateSoundInput: UpdateSoundInput) {
    return this.soundsService.update(updateSoundInput.id, updateSoundInput);
  }

  @Mutation(() => Sound)
  removeSound(@Args('id', { type: () => Int }) id: number) {
    return this.soundsService.remove(id);
  }
}
