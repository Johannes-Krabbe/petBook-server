import { Request, Response, NextFunction } from "express";

async function createPostMiddleware(req: Request, res: Response, next: NextFunction) {
	let valid = true

	if (req.body.name.content > 3) {
		valid = false
	}


	if (valid) {
		next()
	} else {
		res.status(400).send({ message: "Every post must contain at least 4 characters" })
	}

}

export default createPostMiddleware;
