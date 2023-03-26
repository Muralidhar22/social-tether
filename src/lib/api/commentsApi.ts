import tetherAxios from "./axiosInstance"

export const commentsPostEndpoint = "api/comments/post"

export const getCommentsCount = async (postId: string) => {
    const { data: response  } = await tetherAxios.get(`${commentsPostEndpoint}/${postId}?q=count`)
    return response.data.count
}

export const getPostComments = async (postId: string) => {
    const { data: commentsResponse } = await tetherAxios.get(commentsPostEndpoint, {
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