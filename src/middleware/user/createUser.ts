import { Request, Response, NextFunction } from "express";

async function createUserMiddleware(req: Request, res: Response, next: NextFunction) {
	let valid = true
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

	if (req.body.username.lenght > 3) {
		valid = false
	}
	if (req.body.email > 3) {
		valid = false
	}
	if (req.body.password > 3) {
		valid = false
	}
	if (req.body.name > 3) {
		valid = false
	}
	if (req.body.name > 3) {
		valid = false
	}
	if (req.body.bio > 3) {
		valid = false
	}
	// if (req.body.profilePictureUrl > 3) {
	// 	valid = false
	// }

	if (valid) {
		next()
	} else {
		res.status(400).send({ message: "Every field must contain at least 4 characters" })
	}

}

export default createUserMiddleware;
