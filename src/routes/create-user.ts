import { FastifyInstance } from "fastify";
import { userController } from "../user";

export async function createUser(app: FastifyInstance) {
  app.post("/user", { onRequest: [app.authenticate] }, async (request, reply) => {
    await userController.createUser(request, reply);
  });
}
