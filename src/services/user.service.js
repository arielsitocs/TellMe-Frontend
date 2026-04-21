import { api } from "@/src/lib/axios"

export const getUsers = async () => {
    const response = await api.get(`/users`);
    return response.data;
}

export const getUser = async (id) => {
    const response = await api.get(`/users/${id}`)
    return response.data;
}

export const updateUser = async (id, userData, token, imageFile) => {
    const formData = new FormData()

    // Agrega los datos del usuario //
    formData.append('email', userData.email)
    formData.append('firstname', userData.firstname)
    formData.append('lastname', userData.lastname)
    formData.append('username', userData.username)
    formData.append('description', userData.description || '')
    formData.append('color', userData.color || '')

    // Solo agrega la imagen si viene una //
    if (imageFile) {
        formData.append('image', imageFile)
    }

    const response = await api.patch(`/users/${id}`, formData, {
        // Se le pasa el token donde se extrae el userid del usuario logueado //
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
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
    const response = await api.delete(`/users/follow/${followedid}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}
