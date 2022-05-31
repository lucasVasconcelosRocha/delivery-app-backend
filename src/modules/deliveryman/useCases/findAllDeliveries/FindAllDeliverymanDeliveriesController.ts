import { FindAllDeliverymanDeliveriesUseCase } from "./FindAllDeliverymanDeliveriesUseCase";
import { Request, Response } from "express";

export class FindAllDeliverymanDeliveriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: id_deliveryman } = request.deliveryman;

    const findAllDeliverymanDeliveriesUseCase =
      new FindAllDeliverymanDeliveriesUseCase();

    const deliveries = await findAllDeliverymanDeliveriesUseCase.execute(
      id_deliveryman
    );

    return response.json(deliveries);
  }
}
