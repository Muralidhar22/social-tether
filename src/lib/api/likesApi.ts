import tetherAxios from "./axiosInstance"
import { toastSuccess } from "../toastMessage"

export const likesEndpoint = "api/likes"
export const likesPostEndpoint = "api/likes/post"

export const getLikes = async (postId: string, userId:string): Promise<{
    count: number,
    hasUserLiked: {
        id: string;
        value: boolean
    }
}> => {
    const { data: response } = await tetherAxios.get(`${likesPostEndpoint}/${postId}`, { params: { userId } })
    return response.data
}

export const addLike = async (postId: string, userId: string) => {
    const { data: response } = await tetherAxios.post(likesEndpoint, {
        postId,
        userId
    })
    return response.data.addedItem
}

export const removeLike = async (likeId: string) => {
    const { data: response } = await tetherAxios.delete(likesEndpoint, {
        params: { likeId }
    })

    return response.data.removedItem
}