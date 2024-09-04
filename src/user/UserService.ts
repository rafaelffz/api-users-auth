import { userDTO } from "./UserDTO";
import { UserRepository } from "./UserRepository";
import bcrypt from "bcrypt";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: userDTO) {
    const { name, email, password } = data;

    const userAlreadyExists = await this.userRepository.getUserByEmail(email);

    if (userAlreadyExists) throw new Error("This email is already being used by another user!");

    const hashedPassword = bcrypt.hashSync(password, 10);
    return await this.userRepository.createUser({ name, email, password: hashedPassword });
  }

  async getUsers() {
    return await this.userRepository.getUsers();
  }

  async getUser(email: string) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) throw new Error("User not found!");

    const { password, ...userWithoutPass } = user;

    return { user: userWithoutPass };
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.getUserById(id);

    if (!user) throw new Error("User not found!");

    await this.userRepository.deleteUser(id);
  }
}
