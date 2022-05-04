import { Request, Response, NextFunction } from "express";

async function createPetMiddleware(req: Request, res: Response, next: NextFunction) {
	let valid = true
	/**
					{
							"name" : "johannes.krabbe",
							"species" : "foo@bar.net",
							"race" : "Johannes Krabbe",
							"gender" : "I am Johannes, 19, from Berlin",
					}
					*/
	if (req.body.name.lenght > 1) {
		valid = false
	}
	if (req.body.species > 1) {
		valid = false
	}
	if (req.body.race > 1) {
		valid = false
	}
	if (req.body.gender > 1) {
		valid = false
	}

	if (valid) {
		next()
	} else {
		res.status(400).send({ message: "Every field must contain at least 2 characters" })
	}

}

export default createPetMiddleware;
