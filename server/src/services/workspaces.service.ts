import { getMemberships } from "../repositories/memberRepository";
import {isWorkspaceExist, findMember, createNewWorkspace, findWorkspace, updateWorkspaceDetailsRepo, existingWorkspaceMember, deleteWorkspaceRepo, createWorkspaceMember, updateMember} from "../repositories/workspaceRepository"
import { existingUser } from "../repositories/userRepository";
 
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

  return workspaceDetails;
}

export const updateWorkspaceDetails = async(workspaceId: string, body:any) =>{

  const workspace = await findWorkspace(workspaceId);
  if(!workspace) {
    throw new Error(`Workspace with this id "${workspaceId}" does not exist`
    );
  }

  const slug = body.name;
  if (slug) {
     const existing = await isWorkspaceExist(slug)
    if (existing) throw new Error(`Slug "${slug}" is already taken`);
  }

  const updatedWorkspace = await updateWorkspaceDetailsRepo(workspaceId,body);
  return updatedWorkspace

}

export const deleteWorkspace = async(workspaceId: string) =>{

  const workspace = await findWorkspace(workspaceId);
  if(!workspace) {
    throw new Error(`Workspace with this id "${workspaceId}" does not exist`
    );
  }

  const deleted = await deleteWorkspaceRepo(workspaceId)
  if(!deleted){
    throw new Error(`Workspace with this id "${workspaceId}" can't be deleted`)
  }
}

export const inviteMember = async(workspaceId: string, body: any) =>{

  const workspace = await findWorkspace(workspaceId);
  if(!workspace) {
    throw new Error(`Workspace with this id "${workspaceId}" does not exist`
    );
  }

  const invitee = await existingUser(body.email);
  if (!invitee) {
    throw new Error(`No account found with email ${body.email}. They need to register first.`);
  }

  // if(invitee.id === "current userId"){
  //   throw new Error(`No account found with email ${body.email}. They need to register first.`);
  // }

  const existingMember = await existingWorkspaceMember(workspaceId, invitee);
  if (existingMember) {
    throw Error(
      `${invitee.name} is already a member of this workspace`
    );
  }

  const member = createWorkspaceMember(workspaceId, invitee, body)
  return member

}

export const updateWorkspaceMember = async(workspaceId:string, userId:string, body:any) =>{
  
  const workspace = await findWorkspace(workspaceId);
  if(!workspace) {
    throw new Error(`Workspace with this id "${workspaceId}" does not exist`
    );
  }

  const targetMember = await findMember(workspaceId, userId);

  if (!targetMember) throw new Error("Member not found");

  if (userId === "currentuserId") {
    throw new Error("You cannot change your own role")
  }

  if (targetMember.role === "OWNER") {
    throw new Error("Cannot change the role of a workspace OWNER");
  }

  if (body.role === "OWNER") {
    throw new Error("Cannot assign OWNER role. Use the transfer ownership endpoint instead");
  }

  const updatedMember = updateMember(workspaceId, userId, body);
  return updatedMember;

}