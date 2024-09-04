import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "./UserService";
import { emailSchema, idSchema, userSchema } from "./UserDTO";
import { z } from "zod";

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const user = userSchema.parse(request.body);

      await this.userService.createUser(user);

      reply.status(201).send({ message: "User created successfully" });
    } catch (error) {
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

      return reply.status(500).send(error || "Unexpected error");
    }
  }

  async getUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await this.userService.getUsers();

      const usersWithoutPass = users.map(({ password, ...user }) => user);

      reply.status(200).send(usersWithoutPass);
    } catch (error) {
      return reply.status(500).send(error || "Unexpected error");
    }
  }

  async getUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email } = emailSchema.parse(request.body);

      const user = await this.userService.getUser(email);

      reply.status(200).send(user);
    } catch (error) {
      reply.status(500).send(error);
    }
  }

  async deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = idSchema.parse(request.params);

      await this.userService.deleteUser(id);

      reply.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
      reply.status(500).send(error);
    }
  }
}
