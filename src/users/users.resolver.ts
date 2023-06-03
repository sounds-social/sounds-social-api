import { Resolver, Query, Args, Int, Context, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService
    ) {}

  @Query(() => [User], { name: 'users' })
  findAll(@Context() context) {
    // console.log(context.req.user);
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('slug') slug: string, @Context() context) {
    // console.log(context.req.user);
    return this.usersService.findOne(slug);
  }

  @ResolveField()
  async displayName(@Parent() user: User) {
    const { username, displayName } = user;

    return displayName ? displayName : username;
  }

  @ResolveField()
  async sounds(@Parent() user: User) {
    const { id } = user;

    return await this.usersService.findSoundsForUser(id);
  }

  @ResolveField()
  async likes(@Parent() user: User) {
    const { id } = user;

    return await this.usersService.findLikesForUser(id);
  }
}
