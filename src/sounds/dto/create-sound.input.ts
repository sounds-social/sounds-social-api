import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSoundInput {
  @Field()
  title: string;

  @Field()
  slug: string;

  /* TODO: Pre-save uri on server side */
  @Field()
  uri: string;
}
