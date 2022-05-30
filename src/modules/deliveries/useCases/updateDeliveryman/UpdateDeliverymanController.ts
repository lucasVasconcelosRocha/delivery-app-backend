import { Request, Response } from "express";
import { UpdateDeliverymanUseCase } from "./UpdateDeliverymanUseCase";

export class UpdateDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: id_delivery } = request.params;
    const { id: id_deliveryman } = request.deliveryman;

    console.log(request, request.route, request.params, request.query);

    const updateDeliverymanUseCase = new UpdateDeliverymanUseCase();

    console.log(id_delivery, id_deliveryman);

    const result = await updateDeliverymanUseCase.execute({
      id_delivery,
      id_deliveryman,
    });

    return response.json(result);
  }
}
