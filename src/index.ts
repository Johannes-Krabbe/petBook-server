import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";

import { createConnection } from "typeorm";

createConnection()
  .then((connection) => {
    const app = require("./app").default;

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.info(`Running on port ${PORT}`);
    });
  })
  .catch(console.error);
