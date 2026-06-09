import prisma from "../prisma/prisma";

export const getMemberships = async (userId: string) =>
  await prisma.member.findMany({
    where: { userId },
    include: {
      workspace: true,
    },
  });
