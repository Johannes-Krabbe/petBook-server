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

	console.log(req.body)

	if (!(req.body.username.lenght > 2)) { valid = false }
	if (!(req.body.username.lenght > 2)) { valid = false }
	if (!(req.body.email.lenght > 2)) { valid = false }
	if (!(req.body.password.lenght > 2)) { valid = false }
	if (!(req.body.name.lenght > 2)) { valid = false }
	if (!(req.body.bio.lenght > 2)) { valid = false }

	if (!valid) {
		res.status(400).send({ message: "Every field must contain at least 3 characters" })
		return
	}

	if (!(req.body.username.includes(" "))) { valid = false }

	if (!valid) {
		res.status(400).send({ message: "please enter a username without a space." })
		return
	}

	if (valid) {
		next()
	} else {
		// cant happen, shouldnt happen in the future. 
		res.status(400).send({ message: "Something went wrong" })
	}

}

export default createUserMiddleware;
