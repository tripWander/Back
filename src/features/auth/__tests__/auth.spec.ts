import assert from "assert";
import { port } from "@/config/env";
import request from 'supertest';

import app from "@/app";
import { LoginDTO, RegisterDTO } from "@/features/auth/auth.dto";


const newUser = new RegisterDTO('xcvfwrk@gmail.com', 'psd', 'viktor', 'Orlyk', 28);
const badPass = "badPass"

describe('user can register and then login', () => {
  test('runs on test env', () => {
    const portToTest = port
    expect(portToTest).toBe("4000")
  });

  test('can register user', async () => {
     await request(app)
      .post('/auth/register')
      .send(newUser)
      .expect(200)
      .then(response =>{
        assert(response.body.email, newUser.email)
      });
  });

  test('can not register user with already registered email', async () => {
     await request(app)
      .post('/auth/register')
      .send(newUser)
      .expect(400)
  });

  test("user which is registered can login", async ()=>{
    const loginData = new LoginDTO(newUser.email, newUser.password)
    await  request(app)
      .post("/auth/login")
      .send(loginData)
      .expect(200)
      .then(response=>{
        expect(response.body.accessToken).toBeTruthy()
      })
  })
  test("user which is registered can login", async ()=>{
    const loginData = new LoginDTO(newUser.email,badPass )
    await  request(app)
      .post("/auth/login")
      .send(loginData)
      .expect(400)
      .then(response=>{
        expect(response.body.accessToken).toBeUndefined()
      })
  })

});
