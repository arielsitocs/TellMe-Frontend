import { updateUser, getUser } from "../services/user.service";

export async function updateAndSyncUser(userid: number, userData: any, token: string, saveSession: ({ user, token }: any) => void) {
  await updateUser(userid, userData, token);
  saveSession({ user: await getUser(userid), token });
}
