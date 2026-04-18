import { api } from "@/src/lib/axios"

export const getUsers = async () => {
    const response = await api.get(`/users`);
    return response.data;
}

export const getUser = async (id) => {
    const response = await api.get(`/users/${id}`)
    return response.data;
}

export const updateUser = async (id, userData, token) => {
    const response = await api.patch(`/users/${id}`, userData, {
        // Se le pasa el token donde se extrae el userid del usuario logueado //
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const updatePassword = async (id, passwordData, token) => {
    const response = await api.patch(`/users/password/${id}`, passwordData, {
        // Se le pasa el token donde se extrae el userid del usuario logueado //
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const deleteUser = async (id, token) => {
    const response = await api.delete(`/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}

// SERVICIOS DE FOLLOW //

export const getFollows = async () => {
    const response = await api.get('/users/follow')
    return response.data;
}

export const follow = async (followData, token) => {
    const response = await api.post(`/users/follow`, followData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}

export const unfollow = async (followedid, token) => {
    const response = await api.delete(`/users/follow/${followedid}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}
