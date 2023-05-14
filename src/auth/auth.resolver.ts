import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService, 
    private usersService: UsersService
    ) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  signup(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.signup(loginUserInput);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  currentUser(@Context() context) {
    const user = this.usersService.findOneById(
      context.req.user.userId
    )

    return {
      ...context.req.user,
      slug: user.slug,
      id: context.req.user.userId
    };
  }
}
