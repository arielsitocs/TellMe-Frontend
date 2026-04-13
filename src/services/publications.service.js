import { api } from "@/src/lib/axios"

export const getPublications = async () => {
    const response = await api.get('/publications')
    return response.data;
}

export const createPublication = async (publicationData, token) => {
    const response = await api.post('/publications', publicationData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return response.data
}

export const updatePublication = async (id, publicationData, token) => {
    const response = await api.patch(`/publications/${id}`, publicationData, {
        // Se le pasa el token donde se extrae el userid del usuario logueado //
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const deletePublication = async (id, token) => {
    const response = api.delete(`/publications/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}

// SERVICIOS DE LIKES //

export const getLikes = async () => {
    const response = await api.get('/publications/likes/all');
    return response.data;
}

export const like = async (publicationid, token) => {
    const response = await api.post(`/publications/likes/${publicationid}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}

export const dislike = async (publicationid, token) => {
    const response = await api.delete(`/publications/likes/${publicationid}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}