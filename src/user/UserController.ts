import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "./UserService";
import { userSchema } from "./UserValidation";
import { z } from "zod";

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const user = userSchema.parse(request.body);

      await this.userService.createUser(user);

      return reply.status(201).send({ message: "User created successfully" });
    } catch (error) {
      let message: any;
      if (error instanceof z.ZodError) {
        const missingFields = error.errors.filter((err) => err.code === "invalid_type");
        if (missingFields.length > 0) {
          return reply.status(400).send({ message: "All fields are required!" });
        }

        const passwordErrors = error.errors.find((err) => err.path.includes("password"));
        if (passwordErrors) {
          return reply.status(400).send({ message: "Password must be at least 8 characters long" });
        }

        return reply.status(400).send({ message: "Invalid input data" });
      }

      if (error instanceof Error) message = error.message;
      else message = String(error);

      return reply.status(500).send(message || "Unexpected error");
    }
  }

  async getUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await this.userService.getUsers();

      const usersWithoutPass = users.map(({ password, ...user }) => user);

      return reply.status(200).send(usersWithoutPass);
    } catch (error) {
      let message: any;
      if (error instanceof Error) message = error.message;
      else message = String(error);

      return reply.status(500).send(message || "Unexpected error");
    }
  }
}
