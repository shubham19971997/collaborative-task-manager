import bcrypt from "bcrypt";
import prisma from "../prisma/prisma";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt";
import { existingUser } from "../repositories/userRepository";

export const registerUser = async (
  email: string,
  name: string,
  password: string
) => {
  // const existingUser = await prisma.user.findUnique({
  //   where: { email },
  // });

  if (existingUser(email)) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash: hashedPassword,
    },
  });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.refreshToken.create({
    data: {
      token: await bcrypt.hash(refreshToken, 10),
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return { user, accessToken, refreshToken };
};