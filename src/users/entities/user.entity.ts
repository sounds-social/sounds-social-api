import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Sound } from 'src/sounds/entities/sound.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  slug: string;

  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  displayName?: string;

  @Field(type => [Sound])
  sounds: Sound[];
}
