import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { SoundsService } from './sounds.service';
import { Sound } from './entities/sound.entity';
import { UpdateSoundInput } from './dto/update-sound.input';
import { UsersService } from 'src/users/users.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Sound)
export class SoundsResolver {
  constructor(
    private readonly soundsService: SoundsService,
    private readonly usersService: UsersService,
    ) {}

  @Query(() => [Sound], { name: 'sounds' })
  async findAll() {
    return await this.soundsService.findAll();
  }

  @Query(() => Sound, { name: 'sound' })
  @UseGuards(JwtAuthGuard)
  async findOne(@Args('slug') slug: string) {
    return await this.soundsService.findOne(slug);
  }

  @ResolveField()
  async owner(@Parent() sound: Sound) {
    const { ownerId } = sound;
    return this.usersService.findOneById(ownerId);
  }

  @ResolveField()
  async likes(@Parent() sound: Sound) {
    const { id } = sound;

    return await this.soundsService.findLikesForUser(id);
  }

  @Mutation(() => Sound)
  addPlayCount(@Args('slug') slug: string) {
    return this.soundsService.addPlayCount(slug);
  }

  @Mutation(() => Sound)
  async removeSound(@Args('id', { type: () => Int }) id: number) {
    return await this.soundsService.remove(id);
  }

  /*@Mutation(() => Sound)
  updateSound(@Args('updateSoundInput') updateSoundInput: UpdateSoundInput) {
    return this.soundsService.update(updateSoundInput.id, updateSoundInput);
  }*/
}
