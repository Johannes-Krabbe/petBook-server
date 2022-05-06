import { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { User } from "../entity/User/User";
import { Pet } from "../entity/Pet/Pet";
import { Post } from "../entity/Post/Post";

import { getConnection } from "typeorm";

import authMiddleware from "../middleware/auth";

export const postController = Router();

// auth middlewares
postController.use("/getMine", authMiddleware)
postController.use("/create", authMiddleware)


/*
------------------------
GET
------------------------
**/

postController.get(
	"/getAll",
	asyncHandler(async (req: Request, res: Response) => {
		const posts = await Post.find({ relations: ["user", "pet", "pet.owner"] });

		const data: Array<object> = []

		for (const post of posts.reverse()) {
			if (post.pet) {
				data.push({
					id: post.id,
					content: post.content,
					user: {
						name: post.user.name,
						username: post.user.username,
					},
					pet: {
						name: post.pet.name,
						owner: {
							name: post.pet.owner.name,
						}
					}
				})
			} else {
				data.push({
					id: post.id,
					content: post.content,
					user: {
						name: post.user.name,
						username: post.user.username,
					},
				})
			}
		}

		res.status(200).send(data);
	})
);


postController.get(
	"/getMine",
	asyncHandler(async (req: Request, res: Response) => {

		const user = await User.findOne({ uuid: req.body.userUuid }, { relations: ["posts"] })

		// TODO only send neccessary data
		const data = user.posts

		res.status(200).send(data);
	})
);

/*
------------------------
POST
------------------------
**/

postController.post(
	"/create",
	asyncHandler(async (req: Request, res: Response) => {

		const user = await User.findOne({ uuid: req.body.userUuid });

		// if it is a pet specific post
		if (req.body.petUuid) {
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
						user
					})
					.execute();

				// TODO make better return
				res.status(200).send(req.body);
			}
		} else {
			await getConnection()
				.createQueryBuilder()
				.insert()
				.into(Post)
				.values({
					content: req.body.content,
					user
				})
				.execute();

			// TODO make better return
			res.status(200).send(req.body);

		}


	}))


