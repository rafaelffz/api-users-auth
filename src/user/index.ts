import { UserController } from "./UserController";
import { UserRepository } from "./UserRepository";
import { UserService } from "./UserService";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export { userController };
