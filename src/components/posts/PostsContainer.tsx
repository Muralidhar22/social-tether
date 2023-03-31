import { memo } from "react";

import Post from "./Post";
import InfiniteScrollComponent from "../InfiniteScroll";
import { PostsFilterType, PostType } from "@/types";


type PostsPropsType = {
    filter: PostsFilterType
    userId: string
}


const PostsContainer = ({ filter,userId }: PostsPropsType) => {    
    let url = `api/posts?q=${filter}`
    let content;
    switch(filter) {
        case "all": 
            content = <InfiniteScrollComponent<PostType> emptyDataMessage="This is awkward" keyOnData="posts" limit={2} url={url} ComponentToRender={Post} />
            break;
        case "following":
            url = `${url}&userId=${userId}`
            content = <InfiniteScrollComponent emptyDataMessage="Follow users to know what's happening!?" keyOnData="posts" limit={2} url={url} ComponentToRender={Post} />
            break;
        case "user":
          url = `${url}&userId=${userId}`
          content = <InfiniteScrollComponent emptyDataMessage="Post something" keyOnData="posts" limit={2} url={url} ComponentToRender={Post} />
          break;
        default:
            content = <div>No content to display.</div>;
            break;
    }
    return (
        <div>
            {content}
        </div>
    )

}

export default memo(PostsContainer);