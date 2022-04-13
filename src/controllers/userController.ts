import { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { User } from "../entity/User/User";

import { getConnection } from "typeorm";
import { PasswordService } from "../services/passwordService";

export const userController = Router();

userController.post(
  "/createUser",
  asyncHandler(async (req: Request, res: Response) => {
    /**
        {
            "username" : "johannes.krabbe",
            "password" : "qwerty",
            "name" : "Johannes Krabbe",
            "bio" : "I am Johannes, 19, from Berlin",
            "profilePictureUrl" : "https://picsum.photos/200"
        }
        */

    if ((await User.find({ username: req.body.username })).length !== 0) {
      res.status(409).send("this username already exists");
    } else {
      const passwordData = await PasswordService.hashPassword(
        req.body.password
      );

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: req.body.username,
          passwordHash: passwordData.hashPassword,
          passwordSalt: passwordData.salt,
          name: req.body.name,
          bio: req.body.bio,
          profilePictureUrl: req.body.profilePictureUrl,
        })
        .execute();

      // TODO make better return
      res.status(200).send(req.body);
    }
  })
);

userController.get(
  "/getUsers",
  asyncHandler(async (req: Request, res: Response) => {
    res.status(200).send();
  })
);

userController.get(
  "/getMe",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findOne();
    console.log(user);

    res.status(200).send(user);
  })
);

userController.post(
  "/login",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(400).json({ message: "user does not exist" });
      return;
    }
    const isValid = await PasswordService.validatePassword(
      user.passwordHash,
      user.passwordSalt,
      req.body.password
    );
    if (isValid) {
      const token = PasswordService.createToken(user.uuid);
      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: "wrong password" });
    }
  })
);
