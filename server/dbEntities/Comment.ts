import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
// import User from "./User"
import Post from "./Post"

@Entity('comment')
export default class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string
    
    @Column()
    userEmail: string
    
    @ManyToOne(() => Post, (post) => post.comments)
    post: Post
}
// @ManyToOne(() => User, (user) => user.comments)
// user: User