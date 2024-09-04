import { UserRepository } from "../user/UserRepository";
import { AuthController } from "./AuthController";
import { AuthService } from "./AuthService";

const userRepository = new UserRepository();
const authservice = new AuthService(userRepository)
const authController = new AuthController(authservice)

export { authController };