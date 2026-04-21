import { api } from '@/src/lib/axios';

// Realiza una peticion post al auth a backend y retorna el token y el usuario //
export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data;
}

export const register = async (userData, imageFile = null) => {
    const formData = new FormData()

    // Agrega los datos del usuario //
    formData.append('email', userData.email)
    formData.append('firstname', userData.firstname)
    formData.append('lastname', userData.lastname)
    formData.append('username', userData.username)
    formData.append('password', userData.password)
    formData.append('description', userData.description || '')
    formData.append('color', userData.color || '')
    formData.append('imageurl', userData.imageurl || '')

    // Solo agrega la imagen si viene una //
    if (imageFile) {
        formData.append('image', imageFile)
    }

    const response = await api.post('/users', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });

    return response.data;
}


