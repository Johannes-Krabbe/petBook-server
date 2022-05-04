import { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { User } from "../entity/User/User";
import { Pet } from "../entity/Pet/Pet";
import { Post } from "../entity/Post/Post";

import { getConnection } from "typeorm";
import authMiddleware from "../middleware/auth";
import createPetMiddleware from "../middleware/pet/createPet";
import createPostMiddleware from "../middleware/pet/createPost";

export const petController = Router();

//auth middleware
petController.use("/create", authMiddleware);
petController.use("/createPost", authMiddleware);
petController.use("/getMine", authMiddleware);

//other middleware
petController.use("/create", createPetMiddleware);
petController.use("/createPost", createPostMiddleware);


petController.post(
	"/createPost",
	asyncHandler(async (req: Request, res: Response) => {

		const user = await User.findOne({ uuid: req.body.userUuid });
		const pet = await Pet.findOne(
			{ uuid: req.body.petUuid },
			{ relations: ["owner"] }
		);

		if (user.uuid === pet.owner.uuid) {
			await getConnection()
				.createQueryBuilder()
				.insert()
				.into(Post)
				.values({
					content: req.body.content,
					pet,
				})
				.execute();

			// TODO make better return
			res.status(200).send(req.body);
		}
	})
);

petController.post(
	"/create",
	asyncHandler(async (req: Request, res: Response) => {
		/**
				{
						"name" : "johannes.krabbe",
						"species" : "foo@bar.net",
						"race" : "Johannes Krabbe",
						"gender" : "I am Johannes, 19, from Berlin",
				}
				*/
		const user = await User.findOne({ uuid: req.body.userUuid });

		await getConnection()
			.createQueryBuilder()
			.insert()
			.into(Pet)
			.values({
				name: req.body.name,
				species: req.body.species,
				birthdate: "",
				race: req.body.race,
				gender: req.body.gender,
				owner: user,
			})
			.execute();

		// TODO make better return
		res.status(200).send(req.body);
	})
);

petController.get(
	"/getMine",
	asyncHandler(async (req: Request, res: Response) => {
		const user = await User.findOne(
			{ uuid: req.body.userUuid },
			{ relations: ["pets"] }
		);
		const pets = user.pets;

		res.status(200).send(pets);
	})
);

// petController.get(
// 	"/getAll",
// 	asyncHandler(async (req: Request, res: Response) => {
// 		const pets = await Pet.find({ relations: ["owner"] });

// 		res.status(200).send(pets);
// 	})
// );

petController.get(
	"/getAllPosts",
	asyncHandler(async (req: Request, res: Response) => {
		const posts = await Post.find({ relations: ["pet", "pet.owner"] });

		const data: Array<object> = []

		for (const post of posts) {
			data.push({
				id: post.id,
				content: post.content,
				pet: {
					name: post.pet.name,
					owner: {
						name: post.pet.owner.name,
					}
				}
			})
		}

		res.status(200).send(data);
	})
);
