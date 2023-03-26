import axios from "axios";

import tetherAxios from "./axiosInstance"

export const likesUrlEndpoint = "api/likes"
export const likesPostEndpoint = "api/likes/post"

export const getLikes = async (postId: string) => {
    const { data, status } = await tetherAxios.get(likesUrlEndpoint, { data: { postId } })
    return data  
}

export const getLikesCount = async (postId: string): Promise<number> => {
    const { data: response } = await tetherAxios.get(`${likesPostEndpoint}/${postId}?q=count`)
    return response.data.count
}

export const getHasUserLikedPost = async (postId: string, userId:string) => {
    const { data: response } = await tetherAxios.get(`${likesPostEndpoint}/${postId}?q=user`, { params: { userId } })
    return response.data.hasLikedPost
}

export const addLike = async (postId: string, userId: string) => {
    // const {} = await axios.post(likesUrlEndpoint)
}

export const removeLike = async (postId: string, userId: string) => {
    // const {} = await axios.delete(likesUrlEndpoint)
}