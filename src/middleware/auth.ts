import { Request, Response, NextFunction } from "express";
import { Helper } from "../services/helper";
import { PasswordService } from "../services/passwordService";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const token = Helper.getCookie("pb_jwt", req.headers.cookie);

	if (token !== null) {
		const decodedToken = PasswordService.validateToken(token);

		if (decodedToken) {
			req.body.userUuid = decodedToken.sub;
		} else {
			res.status(401).send();
		}
	} else {
		res.status(401).send();
	}
	if (req.body.userUuid) {
		next();
	} else {
		res.status(401).send();
	}
}

export default authMiddleware;
