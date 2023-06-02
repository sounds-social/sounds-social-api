import { Sound } from "src/sounds/entities/sound.entity"
import { Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn } from "typeorm"
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";

@ObjectType()
@Entity()
export class LikeEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    likeId: number

    @Field(type => Date)
    @CreateDateColumn()
    createdAt: Date;

    @Field(type => Date)
    @DeleteDateColumn()
    deletedAt: Date;

    @Field(type => Sound)
    @ManyToOne(() => Sound, (sound) => sound.likes)
    sound: Sound

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.likes)
    user: User
}
