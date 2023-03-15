import axios from "axios"

import { PostsFilterType } from "@/types"
import tetherAxios from "./axiosInstance"

export const postsUrlEndpoint = "/api/posts"

export const getPosts = async (filter: PostsFilterType) => {
 const { data, status } = await tetherAxios.get(postsUrlEndpoint, {
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