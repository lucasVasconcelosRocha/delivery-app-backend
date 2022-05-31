import { prisma } from "../../../../database/prismaClient";

export class FindAllDeliverymanDeliveriesUseCase {
  async execute(id_deliveryman: string) {
    const deliveries = await prisma.deliveryman.findMany({
      where: {
        id: id_deliveryman,
      },
      select: {
        username: true,
        deliveries: true,
      },
    });

    return deliveries;
  }
}
