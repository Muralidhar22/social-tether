import tetherAxios from "./axiosInstance"

export const likesEndpoint = "api/likes"
export const likesPostEndpoint = "api/likes/post"

export const getLikes = async (postId: string) => {
    const { data, status } = await tetherAxios.get(likesEndpoint, { data: { postId } })
    return data  
}

export const getLikesCount = async (postId: string): Promise<number> => {
    const { data: response } = await tetherAxios.get(`${likesPostEndpoint}/${postId}?q=count`)
    return response.data.count
}

export const getHasUserLikedPost = async (postId: string, userId:string): Promise<{
    id: string;
    value: boolean
}> => {
    const { data: response } = await tetherAxios.get(`${likesPostEndpoint}/${postId}?q=user`, { params: { userId } })
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
 await tetherAxios.delete(likesEndpoint, {
        params: { likeId }
    })
}