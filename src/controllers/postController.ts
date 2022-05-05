import { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { User } from "../entity/User/User";
import { Pet } from "../entity/Pet/Pet";
import { Post } from "../entity/Post/Post";


import authMiddleware from "../middleware/auth";

export const postController = Router();

// auth middlewares
postController.use("/getMine", authMiddleware)



postController.get(
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


postController.get(
	"/getMine",
	asyncHandler(async (req: Request, res: Response) => {

		const user = await User.findOne({ uuid: req.body.userUuid }, { relations: ["pets", "pets.posts"] })

		// TODO only send neccessary data
		const data = user

		res.status(200).send(data);
	})
);
