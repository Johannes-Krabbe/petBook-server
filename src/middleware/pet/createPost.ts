import { Request, Response, NextFunction } from "express";

async function createPostMiddleware(req: Request, res: Response, next: NextFunction) {

	if (req.body.content.length < 3) {
		res.status(400).send({ message: "Every post must contain at least 4 characters" })
		return
	}

	next()

}

export default createPostMiddleware;
