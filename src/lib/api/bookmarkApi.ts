import tetherAxios from "./axiosInstance"

export const bookmarkEndpoint = "api/bookmark"

export const getHasUserBookmarked = async (postId: string, userId: string): Promise<{ id: string, value: boolean }> => {
    const { data: response  } = await tetherAxios.get(`${bookmarkEndpoint}?q=post`,{
        params: { postId, userId }
    })
    return response.data
}

export const addBookmark = async (postId: string, userId: string): Promise<{addedItem: string}> => {
    const { data: response  } = await tetherAxios.post(bookmarkEndpoint,{
        postId, userId
    })
    return response.data
}

export const removeBookmark = async (bookmarkId: string): Promise<{removedItem: string}> => {
    const { data: response  } = await tetherAxios.delete(bookmarkEndpoint,{
        params: { bookmarkId }
    })
    return response.data
}