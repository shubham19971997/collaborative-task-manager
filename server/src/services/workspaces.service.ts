import { getMemberships } from "../repositories/memberRepository";


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
      }));

    return workspaces;

}