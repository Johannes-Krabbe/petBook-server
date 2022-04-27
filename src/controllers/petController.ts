import { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { User } from "../entity/User/User";
import { Pet } from "../entity/Pet/Pet";

import { getConnection } from "typeorm";
import { PasswordService } from "../services/passwordService";
import authMiddleware from "../middleware/auth";

export const petController = Router();

//middleware
petController.use("/create", authMiddleware);
petController.use("/getMine", authMiddleware);

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

petController.get(
	"/getAll",
	asyncHandler(async (req: Request, res: Response) => {
		const pets = await Pet.find({ relations: ["owner"] });

		res.status(200).send(pets);
	})
);
