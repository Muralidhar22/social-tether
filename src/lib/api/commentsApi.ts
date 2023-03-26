import axios from "axios"
import { Fetcher } from "swr"

import tetherAxios from "./axiosInstance"

export const commentsOfPostEndpoint = "/api/comments/post"

export const getPostComments = async (postId: string) => {
    const { data: commentsResponse } = await tetherAxios.get(commentsOfPostEndpoint, {
        params: { postId }
    })
    return commentsResponse.data
}

export const updateComment = async () => {
    
}

export const addComment = async () => {
    
}

export const deleteComment = async () => {
    
}