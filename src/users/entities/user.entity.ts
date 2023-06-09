import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Sound } from 'src/sounds/entities/sound.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LikeEntity } from 'src/likes/entities/like-entity.entity';

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

  @Field(type => [LikeEntity], { nullable: true })
  @OneToMany(() => LikeEntity, like => like.user, { nullable: true })
  likes?: LikeEntity[];
}
