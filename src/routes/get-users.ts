import { FastifyInstance } from "fastify";
import { userController } from "../user";

export async function getUsers(app: FastifyInstance) {
  app.get("/users", { onRequest: [app.authenticate] }, async (request, reply) => {
    await userController.getUsers(request, reply);
  });
}
