import { port } from "@/config/env";
import request from 'supertest';

import app from "@/app";
import { RegisterDTO } from "@/features/auth/auth.dto";


describe('user can register and then login', () => {
  test('2 + 2', () => {
    const portToTest = port
    expect(portToTest).toBe("4000")
    expect(2 + 2).toBe(4);
  });

  test('can register user', async () => {
    const newUser = new RegisterDTO('vik@gmail.com', 'psd', 'viktor', 'Orlyk', 28);
    const result = await request(app).post('/auth/register').send(newUser).expect(400);
  });
});
