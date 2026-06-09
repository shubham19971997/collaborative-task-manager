import prisma from "../prisma/prisma";
import { Role } from "@prisma/client";

export const isWorkspaceExist = async (slug: string) =>
  await prisma.workspace.findUnique({
    where: { slug },
    select: { id: true },
  });

export const createNewWorkspace = async (
  body: any,
  slug: string,
  userId: any
) =>
  await prisma.workspace.create({
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
        where: { userId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
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

export const findWorkspace = async (workspaceId: string) =>
  await prisma.workspace.findUnique({
    where: { id: workspaceId },
  });

export const updateWorkspaceDetailsRepo = async (
  workspaceId: string,
  body: any
) =>
  await prisma.workspace.update({
    where: { id: workspaceId },
    data: {
      ...(body.name && { name: body.name }),
      ...(body.slug && { slug: body.slug }),
    },
    include: {
      _count: { select: { members: true, boards: true } },
    },
  });

export const deleteWorkspaceRepo = async (workspaceId: string) =>
  await prisma.workspace.delete({
    where: { id: workspaceId },
  });

export const existingWorkspaceMember = async (
  workspaceId: string,
  invitee: any
) =>
  await prisma.member.findUnique({
    where: {
      userId_workspaceId: {
        userId: invitee.id,
        workspaceId,
      },
    },
  });

export const createWorkspaceMember = async (
  workspaceId: string,
  invitee: any,
  body: any
) =>
  await prisma.member.create({
    data: {
      userId: invitee.id,
      workspaceId,
      role: body.role ?? "MEMBER",
    },
    include: {
      user: {
        select: { id: true, name: true, email: true, avatarUrl: true },
      },
      workspace: {
        select: { id: true, name: true, slug: true },
      },
    },
  });

export const findMember = async (workspaceId: string, userId: string) =>
  await prisma.member.findUnique({
    where: {
      userId_workspaceId: {
        userId: userId,
        workspaceId,
      },
    },
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
  });

export const updateMember = async (
  workspaceId: string,
  userId: string,
  body: any
) =>
  await prisma.member.update({
    where: {
      userId_workspaceId: {
        userId: userId,
        workspaceId,
      },
    },
    data: { role: body.role },
    include: {
      user: {
        select: { id: true, name: true, email: true, avatarUrl: true },
      },
    },
  });

export const deleteWorkspaceMember = async (
  workspaceId: string,
  userId: string
) =>
  await prisma.member.delete({
    where: {
      userId_workspaceId: {
        userId: userId,
        workspaceId,
      },
    },
  });
