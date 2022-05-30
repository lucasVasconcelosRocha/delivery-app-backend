import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import auth from "../config/auth";
import { AppError } from "../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureClientAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: id_client } = verify(
      token,
      auth.secret_client_token
    ) as IPayload;

    request.client = {
      id: id_client,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
