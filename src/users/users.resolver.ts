import { Resolver, Query, Args, Int, Context, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll(@Context() context) {
    // console.log(context.req.user);
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('slug') slug: string, @Context() context) {
    // console.log(context.req.user);
    return this.usersService.findOne(slug);
  }

  @ResolveField()
  async displayName(@Parent() user: User) {
    const { username, displayName } = user;
    return displayName ? displayName : username;
  }
}
