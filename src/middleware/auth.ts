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
	}

	next();
}

export default authMiddleware;
