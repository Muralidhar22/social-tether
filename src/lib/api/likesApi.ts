import axios from "axios";

export const likesUrlEndpoint = "/api/likes"

export const getLikes = async (postId: string) => {
    const { data, status } = await axios.get(likesUrlEndpoint, { data: { postId } })
    return data  
}

export const addLike = async (postId: string, userId: string) => {
    // const {} = await axios.post(likesUrlEndpoint)
}

export const removeLike = async (postId: string, userId: string) => {
    // const {} = await axios.delete(likesUrlEndpoint)
}