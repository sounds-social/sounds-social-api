import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Sound {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field()
  uri: string;

  @Field(type => User)
  owner: User;
}
