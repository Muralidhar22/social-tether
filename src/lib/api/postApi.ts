import axios from "axios"

import { PostsFilterType } from "@/types"

export const postsUrlEndpoint = "/api/posts"

export const getPosts = async (filter: PostsFilterType) => {
 const { data, status } = await axios.get(postsUrlEndpoint, {
    params: { q: filter }
 })
 return data;
}

export const addPost = async () => {
   
}

export const updatePost = async () => {
   
}

export const deletePost = async () => {
   
}