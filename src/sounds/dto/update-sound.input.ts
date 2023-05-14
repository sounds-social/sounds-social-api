import { CreateSoundInput } from './create-sound.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSoundInput extends PartialType(CreateSoundInput) {
  @Field(() => Int)
  id: number;
}
