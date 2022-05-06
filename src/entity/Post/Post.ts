import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	Generated,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	OneToMany,
	ManyToMany,
} from "typeorm";
import { Pet } from "../Pet/Pet";
import { User } from "../User/User";

@Entity("posts")
export class Post extends BaseEntity {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	@Generated("uuid")
	public uuid: string;

	// PROPERTIES
	@Column({ type: "varchar", nullable: false })
	public content: string;

	@ManyToOne(() => Pet, (pet) => pet.posts)
	public pet: Pet;

	@ManyToOne(() => User, (user) => user.posts)
	public user: User;

	@CreateDateColumn()
	public createdAt: Date

	@UpdateDateColumn()
	public updatedAt: Date
}
