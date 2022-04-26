import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Generated, CreateDateColumn, OneToMany, ManyToOne, ManyToMany } from 'typeorm'
import { User } from '../User/User'
import { Post } from '../Post/Post'


@Entity('pets')
export class Pet extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    @Generated('uuid')
    public uuid: string



    @Column({ type: 'varchar', nullable: false })
    public name: string

    @Column({ type: 'varchar', nullable: false })
    public species: string

    @Column({ type: 'varchar', nullable: false })
    public birthdate: string

    @Column({ type: 'varchar', nullable: false })
    public race: string

    @Column({ type: 'varchar', nullable: false })
    public gender: string

    @OneToMany(() => User, user => user.pets)
    public owner: User;

    @ManyToMany(() => Post, post => post.pets)
    public posts: Post[];
    }