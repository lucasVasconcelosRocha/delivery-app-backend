import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import auth from "../config/auth";
import { AppError } from "../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureDeliverymanAuthenticated(
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
    const { sub: id_deliveryman } = verify(
      token,
      auth.secret_deliveryman_token
    ) as IPayload;

    request.deliveryman = {
      id: id_deliveryman,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
