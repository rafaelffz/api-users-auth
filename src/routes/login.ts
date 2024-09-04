import { FastifyInstance } from "fastify";
import { authController } from "../auth";

export async function login(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    await authController.login(request, reply);
  });
}
