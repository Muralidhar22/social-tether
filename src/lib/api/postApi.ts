import { PostsFilterType, PostType } from "@/types"
import tetherAxios from "./axiosInstance"

export const postsEndpoint = "/api/posts"
export const postsCountEndpoint = "/api/posts/count"

export const getPostsCount = async (userId: string | undefined) => {
   if(userId) {
      const { data: countResponse, status } = await tetherAxios.get(postsCountEndpoint, {
         params: { userId }
      })
      console.log("broooooo", { countResponse })
      return countResponse.data
   }
}

export const getPosts = async (filter: PostsFilterType, sessionUserId: string) => {
 const { data, status } = await tetherAxios.get(postsEndpoint, {
    params: { q: filter, sid: sessionUserId }
 })
 return data;
}

export const createPost = async (postData: Partial<PostType>) => {
   console.log({postData})
   const { data } = await tetherAxios.post(postsEndpoint, {
         content: postData.content,
         authorId: postData.authorId,
         image: postData.image
   })
   console.log(data)
}

export const updatePost = async () => {
   
}

export const deletePost = async () => {
   
}