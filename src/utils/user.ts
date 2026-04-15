import { getUser } from "../services/user.service";

export const findUser = async (userid: number | null) => {
    try {
        const foundUser = await getUser(userid);
        return foundUser;
    } catch (error) {
        console.error('Error al obtener el usuario: ', error);
    }
}