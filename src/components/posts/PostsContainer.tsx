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
    let content;
    switch(filter) {
        case "all": 
            content = <InfiniteScrollComponent keyOnData="posts" limit={2} url={url} ComponentToRender={Post} />
            break;
        case "following":
            content = <InfiniteScrollComponent keyOnData="posts" limit={2} url={url} ComponentToRender={Post} />
            break;
        case "user":
          url = `${url}&userId=${userId}`
          content = <InfiniteScrollComponent keyOnData="posts" limit={2} url={url} ComponentToRender={Post} />
          break;
        default:
            content = <div>No content to display.</div>;
            break;
    }
    return (
        <div className="">
            {content}
        </div>
    )

}

export default PostsContainer;