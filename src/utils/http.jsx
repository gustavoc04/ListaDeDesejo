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

export const getCategory = async () => {
    try {
        const response = await axios.get(`${apiUrl}/categorias`)
        return response.data

    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        throw error
    }
}

export const getProductsByCategory = async (categoriaId, email) => {
    try {
        const response = await axios.get(`${apiUrl}/produtos/${categoriaId}/${email}`)
        return response.data
    } catch (error) {
        console.error("Erro ao buscar produtos da categoria:", error);
        throw error
    }
}

export const getProductsFromWishlist = async (email) => {
    try {
        const response = await axios.get(`${apiUrl}/listadesejo/${email}`)
        return response.data
    } catch (error) {
        console.error("Erro ao buscar produtos da lista de desejos:", error);
        throw error
    }
}

export const getProductsIdsFromWishlist = async (email) => {
    try {
        const response = await axios.get(`${apiUrl}/listadesejo/${email}/produtoIds`)
        return response.data
    } catch (error) {
        console.error("Erro ao buscar id dos produtos da lista de desejos:", error);
        throw error
    }
}

export const postProductOnWishlist = async (produtoId, email) => {
    try {
        const response = await axios.post(`${apiUrl}/listadesejo/${produtoId}/${email}`)
        return response.data
    } catch (error) {
        console.error("Erro ao adicionar produto à lista de desejos:", error);
        throw error
    }
}

export const deleteProdutcFromWishlist = async (produtoId, email) => {
    try {
        const response = await axios.delete(`${apiUrl}/listadesejo/${produtoId}/${email}`)
        return response.data
    } catch (error) {
        console.error("Erro ao remover produto da lista de desejo:", error)
        throw error
    }
}

