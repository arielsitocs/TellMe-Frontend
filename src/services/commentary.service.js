import { api } from "@/src/lib/axios"

export const getCommentaries = async () => {
    const response = await api.get('/commentaries'); 
    return response.data;
}

export const createCommentary = async (commentaryData, token) => {
    const response = await api.post('/commentaries', commentaryData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}
