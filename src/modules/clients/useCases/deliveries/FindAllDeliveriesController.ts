import { FindAllDeliveriesUseCase } from "./FindAllDeliveriesUseCase";
import { Response, Request } from "express";

export class FindAllDeliveriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: id_client } = request.client;

    const findAllDeliveriesUseCase = new FindAllDeliveriesUseCase();

    const deliveries = await findAllDeliveriesUseCase.execute(id_client);

    return response.json(deliveries);
  }
}
