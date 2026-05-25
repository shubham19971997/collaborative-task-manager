import prisma from "../prisma/prisma";
import { Role } from "@prisma/client";

export const isWorkspaceExist = async(slug:string) => await prisma.workspace.findUnique({
    where:  { slug },
    select: { id: true },
  });

export const createNewWorkspace = async(body:any,slug:string,userId:any) => await prisma.workspace.create({
    data: {
      name: body.name,
      slug,
      members: {
        create: {
          userId,
          role: Role.OWNER,
        },
      },
    },

    include: {
      members: {
        where:   { userId },
        include: {
          user: {
            select: {
              id:        true,
              name:      true,
              email:     true,
              avatarUrl: true,
            },
          },
        },
      },
      _count: {
        select: { boards: true, members: true },
      },
    },
  });

  export const findWorkspace = async(workspaceId:string) => await prisma.workspace.findUnique({
    where:  { id: workspaceId },
  })
