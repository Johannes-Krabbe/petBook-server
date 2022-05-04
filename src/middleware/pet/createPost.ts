import { Request, Response, NextFunction } from "express";

async function createPostMiddleware(req: Request, res: Response, next: NextFunction) {
	let valid = false

	if (!(req.body.content.lenght > 3)) {
		valid = true
	}


	if (!valid) {
		next()
	} else {
		res.status(400).send({ message: "Every post must contain at least 4 characters" })
	}

}

export default createPostMiddleware;
