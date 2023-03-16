import { PostsFilterType, PostType } from "@/types"
import tetherAxios from "./axiosInstance"

export const postsUrlEndpoint = "/api/posts"

export const getPosts = async (filter: PostsFilterType) => {
 const { data, status } = await tetherAxios.get(postsUrlEndpoint, {
    params: { q: filter }
 })
 return data;
}

export const createPost = async (postData: Partial<PostType>) => {
   console.log({postData})
   const { data } = await tetherAxios.post(postsUrlEndpoint, {
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