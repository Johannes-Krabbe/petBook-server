import { Request, Response, NextFunction } from "express";

async function createUserMiddleware(req: Request, res: Response, next: NextFunction) {
	let valid = false
	/**
			{
					"username" : "johannes.krabbe",
					"email" : "foo@bar.net",
					"password" : "qwerty",
					"name" : "Johannes Krabbe",
					"bio" : "I am Johannes, 19, from Berlin",
					"profilePictureUrl" : "https://picsum.photos/200"
			}
			*/

	console.log(req.body)

	if (!(req.body.username.lenght > 3) ||
		!(req.body.email.lenght > 3) ||
		!(req.body.password.lenght > 3) ||
		!(req.body.name.lenght > 3) ||
		!(req.body.bio.lenght > 3)
	) {
		valid = true
	}
	// !(req.body.profilePictureUrl > 3)

	if (valid) {
		next()
	} else {
		res.status(400).send({ message: "Every field must contain at least 4 characters" })
	}

}

export default createUserMiddleware;
