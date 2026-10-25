import api from './apiClient'

export const uploadModels = async (files) => {
    const formData = new FormData()

    Array.from(files).forEach((file) => {
        formData.append('models', file)
    })

    const response = await api.post('/schema/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response.data
}