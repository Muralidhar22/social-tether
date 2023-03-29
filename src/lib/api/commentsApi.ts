import { CommentType } from "@/types"
import tetherAxios from "./axiosInstance"

export const commentsPostEndpoint = "api/comments/post"
export const commentsEndpoint = "api/comments"

export const getCommentsCount = async (postId: string) => {
    const { data: response  } = await tetherAxios.get(`${commentsPostEndpoint}/${postId}?q=count`)
    return response.data.count
}

export const getPostComments = async (postId: string): Promise<CommentType[]> => {
    const { data: commentsResponse } = await tetherAxios.get(`${commentsPostEndpoint}/${postId}`)
    return commentsResponse.data
}

export const updateComment = async () => {
    
}

export const addComment = async (postId: string, userId: string, content: string) => {
    const { data: commentsResponse } = await tetherAxios.post(`${commentsEndpoint}`, {
        postId,
        userId,
        content
    })
    return commentsResponse.data
}

export const deleteComment = async () => {
    
}