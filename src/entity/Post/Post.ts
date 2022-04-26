import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Generated, CreateDateColumn, ManyToOne, OneToMany, ManyToMany } from 'typeorm'
import { Pet } from '../Pet/Pet'
import { Comment } from '../Comment/Comment'

@Entity('posts')
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    @Generated('uuid')
    public uuid: string


    // PROPERTIES
    @Column({ type: 'varchar', nullable: false })
    public content: string

    @ManyToMany(() => Pet, pet => pet.posts)
    public pets: Pet[];

    @ManyToOne(() => Comment, comment => comment.post)
    public comments: Comment[];
}