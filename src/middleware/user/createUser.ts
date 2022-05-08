import { Request, Response, NextFunction } from "express";

async function createUserMiddleware(req: Request, res: Response, next: NextFunction) {
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


	if (req.body.username.length < 2) {
		console.log("HELLOOOOO")
		res.status(400).send({ message: "Every field must contain at least 3 characters" })
		return
	}
	else if (req.body.email.length < 2) {
		res.status(400).send({ message: "Every field must contain at least 3 characters" })
		return
	}
	else if (req.body.name.length < 2) {
		res.status(400).send({ message: "Every field must contain at least 3 characters" })
		return
	}
	else if (req.body.password.length < 2) {
		res.status(400).send({ message: "Every field must contain at least 3 characters" })
		return
	}
	else if (req.body.bio.length < 2) {
		res.status(400).send({ message: "Every field must contain at least 3 characters" })
		return
	}
	else if (req.body.username.includes(" ")) {
		res.status(400).send({ message: "please enter a username without a space." })
		return
	} else {
		next()
	}
}

export default createUserMiddleware;
