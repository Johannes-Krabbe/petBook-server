import { Request, Response, NextFunction } from "express";

async function createPetMiddleware(req: Request, res: Response, next: NextFunction) {
	let valid = false
	/**
					{
							"name" : "johannes.krabbe",
							"species" : "foo@bar.net",
							"race" : "Johannes Krabbe",
							"gender" : "I am Johannes, 19, from Berlin",
					}
					*/
	if (!(req.body.name.lenght > 1) ||
		!(req.body.species > 1) ||
		!(req.body.race > 1) ||
		!(req.body.gender > 1)
	) {
		valid = true
	}

	if (valid) {
		next()
	} else {
		res.status(400).send({ message: "Every field must contain at least 2 characters" })
	}

}

export default createPetMiddleware;
