import { PostsFilterType, PostType } from "@/types"
import { toastSuccess } from "../toastMessage"
import tetherAxios from "./axiosInstance"

export const postsEndpoint = "api/posts"
export const postsCountEndpoint = "api/posts/count"
export const postIdEndpoint = "api/posts/id"

export const getPostsCount = async (userId: string | undefined) => {
   if(userId) {
      const { data: countResponse, status } = await tetherAxios.get(postsCountEndpoint, {
         params: { userId }
      })
      return countResponse.data
   }
}

export const getPostById = async (postId: string): Promise<PostType> => {
   const { data: postResponse } = await tetherAxios.get(`${postIdEndpoint}/${postId}`)
   return postResponse.data
}

export const getPosts = async (filter: PostsFilterType, userId: string, cursor?: string) => {
 const { data: response, status } = await tetherAxios.get(postsEndpoint, {
    params: { q: filter, userId }
 })
 return response.data;
}

export const createPost = async (authorId: string, content: string, image?: string ) => {

   const { data, status } = await tetherAxios.post(postsEndpoint, {
      content,
      authorId,
      image
   })
   status < 300 && toastSuccess(data.message)
}

export const updatePost = async () => {
   
}

export const deletePost = async () => {
   
}