import { FindAvailableDeliveriesController } from "./modules/deliveries/useCases/findAllWithoutEndDate/FindAvailableDeliveriesController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateClient/AuthenticateDeliverymanController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { CreateClientController } from "./modules/clients/useCases/createCliente/CreateClientController";
import { Router } from "express";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDeliveries/CreateDeliveryController";
import { ensureClientAuthenticated } from "./middlewares/ensureClientAuthenticated";
import { ensureDeliverymanAuthenticated } from "./middlewares/ensureDeliverymanAuthenticated";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/deliveries/FindAllDeliveriesController";
import { FindAllDeliverymanDeliveriesController } from "./modules/deliveryman/useCases/findAllDeliveries/FindAllDeliverymanDeliveriesController";
import { UpdateEndDateController } from "./modules/deliveries/useCases/updateEndDate/updateEndDateController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findAvailableDeliveries = new FindAvailableDeliveriesController();
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesClient = new FindAllDeliveriesController();
const findAllDeliveriesDeliveryman =
  new FindAllDeliverymanDeliveriesController();
const updateEndDateController = new UpdateEndDateController();

routes.post("/client", createClientController.handle);

routes.post("/client/authenticate", authenticateClientController.handle);

routes.post("/deliveryman", createDeliverymanController.handle);

routes.post(
  "/deliveryman/authenticate",
  authenticateDeliverymanController.handle
);

routes.post(
  "/delivery",
  ensureClientAuthenticated,
  createDeliveryController.handle
);

routes.put(
  "/delivery/updateDeliveryman/:id",
  ensureDeliverymanAuthenticated,
  updateDeliverymanController.handle
);

routes.get(
  "/delivery/available",
  ensureDeliverymanAuthenticated,
  findAvailableDeliveries.handle
);

routes.get(
  "/client/deliveries",
  ensureClientAuthenticated,
  findAllDeliveriesClient.handle
);

routes.get(
  "/deliveryman/deliveries",
  ensureDeliverymanAuthenticated,
  findAllDeliveriesDeliveryman.handle
);

routes.put(
  "/delivery/updateEndDate/:id",
  ensureDeliverymanAuthenticated,
  updateEndDateController.handle
);

export { routes };
