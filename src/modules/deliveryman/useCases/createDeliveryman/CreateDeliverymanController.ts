import { CreateDeliverymanUseCase } from "./CreateDeliverymanUseCase";
import { Request, Response } from "express";

export class CreateDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const createDeliverymanUseCase = new CreateDeliverymanUseCase();
    const result = await createDeliverymanUseCase.execute({
      username,
      password,
    });

    return response.json(result).status(201);
  }
}
