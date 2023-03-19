import useSWR from "swr"

import InfiniteScrollComponent from "../InfiniteScroll";
import { PostsFilterType, PostType, UserType } from "@/types";


import Image from "next/image";
import UserImage from "../UserImage";
import { userEmailEndpoint as userCacheKey } from "@/lib/api/userApi";
import Post from "./Post";

type PostsPropsType = {
    filter: PostsFilterType
    userId: string
}

const PostsContainer = ({ filter,userId }: PostsPropsType) => {    
    let url = `api/posts?q=${filter}`

    switch(filter) {
        case "all": 
            return (
                <InfiniteScrollComponent keyOnData="posts" limit={2} url={url} ComponentToRender={Post} />
            )
        case "following":
            return (
                <InfiniteScrollComponent keyOnData="posts" limit={2} url={url} ComponentToRender={Post} />
            )
        case "user":
          url = `${url}&userId=${userId}`
          return (
            <InfiniteScrollComponent keyOnData="posts" limit={2} url={url} ComponentToRender={Post} />
        )
        default: 
           throw Error("") 
    }
    return null;
}

export default PostsContainer;