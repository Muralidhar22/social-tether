import { toastSuccess } from "../toastMessage"
import tetherAxios from "./axiosInstance"

export const bookmarkEndpoint = "api/bookmark"

export const getHasUserBookmarked = async (postId: string, userId: string): Promise<{ id: string, value: boolean }> => {
    const { data: response  } = await tetherAxios.get(`${bookmarkEndpoint}?q=post`,{
        params: { postId, userId }
    })
    return response.data
}

export const addBookmark = async (postId: string, userId: string) => {
    const { data: response, status  } = await tetherAxios.post(bookmarkEndpoint,{
        postId, userId
    })
    status < 300 && toastSuccess("Added to bookmarks")
    return response.data.addedItem
}

export const removeBookmark = async (bookmarkId: string) => {
    const { data: response, status  } = await tetherAxios.delete(bookmarkEndpoint,{
        params: { bookmarkId }
    })
    status < 300 && toastSuccess("Removed from bookmarks")
    return response.data.removedItem
}