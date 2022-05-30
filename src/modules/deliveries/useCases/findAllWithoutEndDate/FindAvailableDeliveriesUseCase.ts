import { prisma } from "../../../../database/prismaClient";

export class FindAvailableDeliveriesUseCase {
  async execute() {
    const deliveries = prisma.deliveries.findMany({
      where: {
        end_at: null,
      },
    });

    return deliveries;
  }
}
