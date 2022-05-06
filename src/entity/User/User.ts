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

	@CreateDateColumn()
	public createdAt: Date

	@UpdateDateColumn()
	public updatedAt: Date
}
