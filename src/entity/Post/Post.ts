import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	Generated,
	CreateDateColumn,
	ManyToOne,
	OneToMany,
	ManyToMany,
} from "typeorm";
import { Pet } from "../Pet/Pet";
import { Comment } from "../Comment/Comment";

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

	@ManyToOne(() => Comment, (comment) => comment.post)
	public comments: Comment[];
}
