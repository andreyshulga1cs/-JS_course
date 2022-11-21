import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Post from "./Post";
// import Comment from "./Comment";

@Entity('user')
export default class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    age: string

    @Column()
    password: string

    @Column()
    sex: string

    @Column()
    tel: string

    @Column()
    avatar: string

    @Column()
    accessToken: string

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]
}