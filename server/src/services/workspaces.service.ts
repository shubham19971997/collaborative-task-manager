import { getMemberships } from "../repositories/memberRepository";
import prisma from "../prisma/prisma";
import { Role } from "@prisma/client";

export const getUserWorkspaces = async(userId: string) =>{

    const memberships = await getMemberships(userId);

    if(!memberships){
        throw new Error('Invalid userId, Please check again')
    }

    const workspaces = memberships.map((m) => ({
        id: m.workspace.id,
        name: m.workspace.name,
        slug: m.workspace.slug,
        role: m.role,
        createdAt: m.workspace.createdAt,
        updatedAt: m.workspace.updatedAt
      }));

    return workspaces;

}

export async function createWorkspace(
    userId: string,
    body: any
  ) {
    const slug = body.name;
 
    const existing = await prisma.workspace.findUnique({
      where:  { slug },
      select: { id: true },
    });
  
    if (existing) {
        throw new Error(`The slug "${slug}" is already taken. Try a different name or provide a custom slug.`
        );
    }

    const workspace = await prisma.workspace.create({
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
  
    return workspace;
}