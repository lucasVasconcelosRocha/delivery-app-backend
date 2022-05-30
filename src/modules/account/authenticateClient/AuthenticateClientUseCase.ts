import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import auth from "../../../config/auth";
import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../errors/AppError";

interface IAuthenticateClient {
  username: string;
  password: string;
}

class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if (!client) {
      throw new AppError("Username or password incorrect!");
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    const { secret_client_token, expires_in_token } = auth;

    const token = sign({ username }, secret_client_token, {
      subject: client.id,
      expiresIn: expires_in_token,
    });

    return token;
  }
}

export { AuthenticateClientUseCase };
