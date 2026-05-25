import { getMemberships } from "../repositories/memberRepository";
import {isWorkspaceExist, createNewWorkspace, findWorkspace} from "../repositories/workspaceRepository"

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
 
    const existing = await isWorkspaceExist(slug)
    if (existing) {
        throw new Error(`The slug "${slug}" is already taken. Try a different name or provide a custom slug.`
        );
    }
    const workspace = await createNewWorkspace(body,slug,userId)
    return workspace;
}

export const getWorkspaceDetails = async(workspaceId:string) =>{
  const workspaceDetails = await findWorkspace(workspaceId)

  if(!workspaceDetails) {
    throw new Error(`Workspace with this id "${workspaceId}" does not exist`
    );
  }

  console.log("checking for workspace data", workspaceDetails)

  return workspaceDetails;
}