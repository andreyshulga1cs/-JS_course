import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('user')
export class User {
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
}