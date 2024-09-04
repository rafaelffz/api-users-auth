import { prisma } from "../lib/prisma";
import { userDTO } from "./UserDTO";

export class UserRepository {
  async createUser(user: userDTO) {
    await prisma.user.create({
      data: user,
    });
  }

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  }

  async getUsers() {
    const users = await prisma.user.findMany();

    return users;
  }

  async deleteUser(id: string) {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
