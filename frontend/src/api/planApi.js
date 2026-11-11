import api from './apiClient'

export const generatePlan = async (sessionId) => {
    const response = await api.post(`/plan/${sessionId}`);
    return response.data;
}

export const getPlan = async (sessionId) => {
    const response = await api.get(`/plan/${sessionId}`);
    return response.data;
}