import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { userController } from "../user";

export async function getUser(app: FastifyInstance) {
  app.post("/get-user", { onRequest: [app.authenticate] }, async (request, reply) => {
    await userController.getUser(request, reply);
  });
}
