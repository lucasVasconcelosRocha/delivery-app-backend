import { FindAvailableDeliveriesUseCase } from "./FindAvailableDeliveriesUseCase";
import { Request, Response } from "express";

export class FindAvailableDeliveriesController {
  async handle(request: Request, response: Response) {
    const findAvailableDeliveriesUseCase = new FindAvailableDeliveriesUseCase();
    const deliveries = await findAvailableDeliveriesUseCase.execute();

    return response.json(deliveries);
  }
}
