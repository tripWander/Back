import request from "supertest";

import app from "@/app";
import { port } from "@/config/env";
import { LoginDTO, RegisterDTO } from "@/features/auth/auth.dto";


const newUser = new RegisterDTO("test@gmail.com", "psd", "viktor", "Orlyk", 28);
const badPass = "badPass";

describe("Auth routes", () => {

  test("can register user", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send(newUser)
      .expect(200);
    expect(response.body.email).toBe(newUser.email);
  });

  test("can not register user with already registered email", async () => {
    await request(app)
      .post("/auth/register")
      .send(newUser)
      .expect(400);
  });

  test("user which is registered can login", async () => {
    const loginData = new LoginDTO(newUser.email, newUser.password);
    const response = await request(app)
      .post("/auth/login")
      .send(loginData)
      .expect(200);
    expect(response.body.accessToken).toBeTruthy();
  });

  test("user can't login with wrong password", async () => {
    const loginData = new LoginDTO(newUser.email, badPass);
    const response = await request(app)
      .post("/auth/login")
      .send(loginData)
      .expect(401);
    expect(response.body.accessToken).toBeUndefined();
  });

});
