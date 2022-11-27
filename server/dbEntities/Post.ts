import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToOne, OneToMany, ManyToMany } from "typeorm"
import User from "./User"
import Comment from "./Comment"

@Entity('post')
export default class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    thumbnail: string

    @ManyToOne(() => User, (user) => user.posts)
    user: User

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[]
    
    // @ManyToMany(() => User)
    // @JoinTable()
    // likes: User[]
    
    @ManyToMany(() => User, (user) => user.likes)
    @JoinTable()
    likes: User[]
}