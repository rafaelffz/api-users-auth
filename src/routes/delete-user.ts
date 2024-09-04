import { FastifyInstance } from "fastify";
import { userController } from "../user";

export async function deleteUser(app: FastifyInstance) {
  app.delete("/user/:id", { onRequest: [app.authenticate] }, async (request, reply) => {
    await userController.deleteUser(request, reply);
  });
}
