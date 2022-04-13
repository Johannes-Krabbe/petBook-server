import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Generated, CreateDateColumn } from 'typeorm'

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    @Generated('uuid')
    public uuid: string


    // PROPERTIES
    @Column({ type: 'varchar', nullable: false })
    public username: string

    @Column({ type: 'varchar', nullable: false })
    public passwordHash: string

    @Column({ type: 'varchar', nullable: false })
    public passwordSalt: string

    @Column({ type: 'varchar', nullable: false })
    public name: string

    @Column({ type: 'varchar', nullable: false })
    public bio: string

    @Column({ type: 'varchar', nullable: false })
    public profilePictureUrl: string

}