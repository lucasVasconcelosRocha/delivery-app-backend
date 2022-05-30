import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import auth from "../../../config/auth";
import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../errors/AppError";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username,
      },
    });

    if (!deliveryman) {
      throw new AppError("Username or password incorrect!");
    }

    const passwordHash = await compare(password, deliveryman.password);

    if (!passwordHash) {
      throw new AppError("Username or password incorrect!");
    }

    const { secret_deliveryman_token, expires_in_token } = auth;

    const token = sign({ username }, secret_deliveryman_token, {
      subject: deliveryman.id,
      expiresIn: expires_in_token,
    });

    return token;
  }
}
