import { ObjectType, Field, Int } from '@nestjs/graphql';
import { LikeEntity } from 'src/likes/entities/like-entity.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Sound {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  slug: string;

  @Field()
  @Column()
  uri: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  coverUri?: string;

  @Field(type => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(type => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(type => Date)
  @DeleteDateColumn()
  deletedAt: Date;
  
  @Field(type => Int, { defaultValue: 0 })
  @Column({ nullable: true })
  playCount?: number;

  @Column({ nullable: true })
  ownerId?: number;

  @Field(type => User)
  owner: User;

  @Field(type => [LikeEntity])
  @OneToMany(() => LikeEntity, like => like.user)
  likes: LikeEntity[];
}
