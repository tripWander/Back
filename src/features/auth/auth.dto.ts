export class LoginDTO {
  constructor(public email: string, public password: string) {}
}

export class RegisterDTO {
  constructor(
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public age: number,
  ) {}
}

export class LoginResponseDTO {
  constructor(public accessToken: string, public id: string) {}
}
