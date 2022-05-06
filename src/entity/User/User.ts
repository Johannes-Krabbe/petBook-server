import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Generated,
	ManyToOne,
	OneToMany,
} from "typeorm";
import { Pet } from "../Pet/Pet";
import { Post } from "../Post/Post";


@Entity("users")
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	@Generated("uuid")
	public uuid: string;

	// PROPERTIES
	@Column({ type: "varchar", nullable: false })
	public username: string;

	@Column({ type: "varchar", nullable: false })
	public email: string;

	@Column({ type: "varchar", nullable: false })
	public passwordHash: string;

	@Column({ type: "varchar", nullable: false })
	public passwordSalt: string;

	@Column({ type: "varchar", nullable: false })
	public name: string;

	@Column({ type: "varchar", nullable: false })
	public bio: string;

	@Column({ type: "varchar", nullable: false })
	public profilePictureUrl: string;

	@OneToMany(() => Pet, (pet) => pet.owner)
	pets: Pet[];

	@OneToMany(() => Post, (post) => post.user)
	posts: Post[];

	@CreateDateColumn()
	public createdAt: Date

	@UpdateDateColumn()
	public updatedAt: Date
}
