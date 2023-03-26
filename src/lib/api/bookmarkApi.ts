import tetherAxios from "./axiosInstance"

export const bookmarkEndpoint = "api/bookmark"

export const getHasUserBookmarked = async (postId: string, userId: string) => {
    const { data: response  } = await tetherAxios.get(`${bookmarkEndpoint}?q=post`,{
        params: { postId, userId }
    })
    return response.data.hasUserBookmarked
}

export const addBookmark = async () => {
    
}

export const removeBookmark = async () => {
    
}