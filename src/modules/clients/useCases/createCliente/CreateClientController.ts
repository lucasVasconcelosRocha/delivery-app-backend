import { CreateClientUseCase } from "./CreateClientUseCase";
import { Request, Response } from "express";

export class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const createClientUseCase = new CreateClientUseCase();
    const result = await createClientUseCase.execute({
      username,
      password,
    });

    return response.json(result).status(201);
  }
}
