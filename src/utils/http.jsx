import axios from "axios"

const apiUrl = 'https://listadesejo.azurewebsites.net/api/'

export const signUp = async (userName, userEmail) => {
    try {
        const body = {
            nome: userName,
            email: userEmail
        }

        const response = await axios.post(`${apiUrl}/usuario`, body)
        return response.data

    } catch (error) {
        console.error("Erro ao realizar signUp:", error)
        throw error
    }
}

export const login = async (userEmail) => {
    try{
        const response = await axios.get(`${apiUrl}/usuario/${userEmail}`)
        return response.data

    } catch (error){
        console.error("Erro ao realizar login:", error);
        throw error
    }
}

export const getCategorias = async () => {
    try {
        const response = await axios.get(`${apiUrl}/categorias`)
        return response.data

    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        throw error
    }
}

