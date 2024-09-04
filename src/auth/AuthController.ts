import { FastifyReply, FastifyRequest } from "fastify";
import { loginSchema } from "./LoginDTO";
import { AuthService } from "./AuthService";

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const user = loginSchema.parse(request.body);

      const { email, password } = user;

      if (!email || !password) return reply.status(400).send({ message: "Email and password are required!" });

      const result = await this.authService.login({ email, password });

      return reply.status(200).send({
        message: "User logged in successfully",
        user: result.user,
        token: result.token,
      });
    } catch (error) {
      return reply.status(500).send(error || "Unexpected error");
    }
  }
}
