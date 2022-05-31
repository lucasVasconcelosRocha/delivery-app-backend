import { Request, Response } from "express";
import { UpdateEndDateUseCase } from "./UpdateEndDateUseCase";

export class UpdateEndDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: id_delivery } = request.params;
    const { id: id_deliveryman } = request.deliveryman;

    console.log(request, request.route, request.params, request.query);

    const updateEndDateUseCase = new UpdateEndDateUseCase();

    console.log(id_delivery, id_deliveryman);

    const result = await updateEndDateUseCase.execute({
      id_delivery,
      id_deliveryman,
    });

    return response.json(result);
  }
}
