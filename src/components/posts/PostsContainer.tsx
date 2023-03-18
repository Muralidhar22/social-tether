import useSWR from "swr"

import { getPosts, postsEndpoint as cacheKey } from "@/lib/api/postApi";
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

const PostsContainer = ({ filter,userId, }: PostsPropsType) => {    

    return (
        <InfiniteScrollComponent cacheKey={cacheKey} fetcher={() => getPosts(filter, userId)} ComponentToRender={Post} />
    )
}

export default PostsContainer;