import { Resolver, Query, Mutation, Args, Int, Context, ResolveField, Parent } from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { LikeEntity } from './entities/like-entity.entity';
import { CreateLikeInput } from './dto/create-like.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => LikeEntity)
export class LikesResolver {
  constructor(private readonly likesService: LikesService) {}

  @Mutation(() => LikeEntity)
  @UseGuards(JwtAuthGuard)
  async like(
    @Args('createLikeInput') createLikeInput: CreateLikeInput,
    @Context() context) {
  
    return await this.likesService.like(
      createLikeInput,
      context.req.user.userId
    );
  }

  @Mutation(() => LikeEntity)
  @UseGuards(JwtAuthGuard)
  async removeLike(
      @Args('soundId', { type: () => Int }) soundId: number, 
      @Context() context
    ) {
    
    return await this.likesService.remove(
      soundId,
      context.req.user.userId
    );
  }

  @ResolveField()
  @UseGuards(JwtAuthGuard)
  async currentUserHasLiked(
      @Parent() like: LikeEntity, 
      @Context() context) {
    const userId = context?.req?.user?.userId

    return await this.likesService.userLikes(
      like.likeId,
      userId,
    );
  }

  /*@Query(() => [Like], { name: 'likes' })
  findAll() {
    return this.likesService.findAll();
  }

  @Query(() => Like, { name: 'like' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.likesService.findOne(id);
  }

  @Mutation(() => Like)
  updateLike(@Args('updateLikeInput') updateLikeInput: UpdateLikeInput) {
    return this.likesService.update(updateLikeInput.id, updateLikeInput);
  } */
}
