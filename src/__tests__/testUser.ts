import request from "supertest";
import { Express } from "express-serve-static-core";
import express from "express";
import supertest from "supertest";

let server: Express;

const app = require("../app").default;

beforeEach(() => {
  console.log("top beforeEach");
});
afterEach(() => {
  console.log("top afterEach");
});

test("GET /health-check", async () => {
  await supertest(app)
    .get("/health-check")
    .expect(200)
    .then((response) => {
      expect(true).toBeTruthy();
    });
});

test("GET /user", async () => {
  await supertest(app)
    .get("/user/getUsers")
    .expect(200)
    .then((response) => {
      expect(true).toBeTruthy();
    });
});
