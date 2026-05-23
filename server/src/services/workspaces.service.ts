import { getMemberships } from "../repositories/memberRepository";
import prisma from "../prisma/prisma";
import { Role } from "@prisma/client";
import { slugify } from "zod/v4/core/util.cjs";

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
    // input: CreateWorkspaceInput
  ) {
    const slug = input.slug ?? slugify(input.name);
 
    const existing = await prisma.workspace.findUnique({
      where:  { slug },
      select: { id: true },       // select minimum — we only need to know it exists
    });
  
    if (existing) {

        throw new Error(`The slug "${slug}" is already taken. Try a different name or provide a custom slug.`
        );

    }

    const workspace = await prisma.workspace.create({
      data: {
        name: input.name,
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
          where:   { userId },         // only include the caller's membership
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