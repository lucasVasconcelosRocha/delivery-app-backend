import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../database/prismaClient";

interface IUpdateDelivery {
  id_delivery: string;
  id_deliveryman: string;
}

export class UpdateDeliverymanUseCase {
  async execute({ id_delivery, id_deliveryman }: IUpdateDelivery) {
    const deliveryExits = await prisma.deliveries.findFirst({
      where: {
        id: id_delivery,
      },
    });

    if (!deliveryExits) {
      throw new AppError("Delivery not exists.");
    }

    const delivery = await prisma.deliveries.update({
      where: {
        id: id_delivery,
      },
      data: {
        id_deliveryman,
      },
    });

    return delivery;
  }
}
