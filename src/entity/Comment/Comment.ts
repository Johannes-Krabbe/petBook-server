import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Generated, CreateDateColumn, OneToMany } from 'typeorm'
import { Post } from '../Post/Post'

@Entity('comments')
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    @Generated('uuid')
    public uuid: string


    // PROPERTIES
    @Column({ type: 'varchar', nullable: false })
    public text: string

    @OneToMany(() => Post, post => post.comments)
    public post: Post;

}