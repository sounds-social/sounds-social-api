import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { SoundsService } from './sounds.service';
import { Sound } from './entities/sound.entity';
import { UpdateSoundInput } from './dto/update-sound.input';
import { UsersService } from 'src/users/users.service';

@Resolver(() => Sound)
export class SoundsResolver {
  constructor(
    private readonly soundsService: SoundsService,
    private readonly usersService: UsersService,
    ) {}

  @Query(() => [Sound], { name: 'sounds' })
  async findAll() {
    console.log(await this.soundsService.findAll());
    return await this.soundsService.findAll();
  }

  @Query(() => Sound, { name: 'sound' })
  async findOne(@Args('slug') slug: string) {
    return await this.soundsService.findOne(slug);
  }

  @ResolveField()
  async owner(@Parent() sound: Sound) {
    const { ownerId } = sound;
    return this.usersService.findOneById(ownerId);
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
