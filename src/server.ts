import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt";
import { createUser } from "./routes/create-user";
import { getUsers } from "./routes/get-users";
import { login } from "./routes/login";
import { deleteUser } from "./routes/delete-user";
import { getUser } from "./routes/get-user";

export const app = fastify();

app.register(createUser);
app.register(getUsers);
app.register(login);
app.register(getUser)
app.register(deleteUser);

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET as string,
});

app.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();
  } catch (error) {
    let message: any;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    reply.status(500).send({ message: "Invalid token" || message });
  }
});

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333");
});
