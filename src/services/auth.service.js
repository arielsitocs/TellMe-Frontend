import { api } from '@/src/lib/axios';

// Realiza una peticion post al auth a backend y retorna el token y el usuario //
export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data;
}

export const register = async (userData) => {
    const response = await api.post('/users', userData)
    return response.data;
}

