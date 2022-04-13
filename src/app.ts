import express from "express";

import router from "./routes/router";

import cors from "cors";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
    this.app.use(express.json());

    this.app.use("/", router);
  }
}

export default new App().app;
