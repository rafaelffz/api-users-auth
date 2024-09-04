import { UserRepository } from "../user/UserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginDTO } from "./LoginDTO";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(data: loginDTO) {
    const { email, password } = data;
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) throw new Error("User not found!");

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) throw new Error("Incorrect password!");

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

    const { password: pass, ...userWithoutPass } = user;

    return { user: userWithoutPass, token };
  }
}
