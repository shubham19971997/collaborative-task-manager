import { Role } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string | undefined;
      };
      member?: {
        id: string;
        role: Role;
        userId: string;
        workspaceId: string;
      };
    }
  }
}

export {};