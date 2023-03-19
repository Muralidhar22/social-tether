import { PostsFilterType, PostType } from "@/types"
import tetherAxios from "./axiosInstance"

export const postsEndpoint = "/api/posts"
export const postsCountEndpoint = "/api/posts/count"

export const getPostsCount = async (userId: string | undefined) => {
   if(userId) {
      const { data: countResponse, status } = await tetherAxios.get(postsCountEndpoint, {
         params: { userId }
      })
      return countResponse.data
   }
}

export const getPosts = async (filter: PostsFilterType, userId: string, cursor?: string) => {
 const { data: response, status } = await tetherAxios.get(postsEndpoint, {
    params: { q: filter, userId }
 })
 return response.data;
}

export const createPost = async (postData: Partial<PostType>) => {

   const { data } = await tetherAxios.post(postsEndpoint, {
         content: postData.content,
         authorId: postData.authorId,
         image: postData.image
   })

}

export const updatePost = async () => {
   
}

export const deletePost = async () => {
   
}