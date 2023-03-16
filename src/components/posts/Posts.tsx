import useSWR from "swr"

import { getPosts, postsUrlEndpoint as cacheKey } from "@/lib/api/postApi";
import InfiniteScrollComponent from "../InfiniteScroll";
import { PostsFilterType } from "@/types";

const PostContainer = ({ className }: { className: string }) => (
<div className={className}>
        OMG!
        
</div>)

type PostsPropsType = {
    filter: PostsFilterType
    sessionUserId: string
}

const Posts = ({ filter,sessionUserId }: PostsPropsType) => {
    
    const url = new URL("http://localhost:3000")
    const { 
        isLoading,
        error,
        data: posts,
        mutate
     } = useSWR(cacheKey,() => getPosts(filter, sessionUserId), {
        // onSuccess: data => data.sort((a, b) => b.id - a.id)
     })
     console.log({ posts })
    return (
        <InfiniteScrollComponent endpoint={url} ComponentToRender={PostContainer} />
    )
}

export default Posts;