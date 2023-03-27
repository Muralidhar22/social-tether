import { useRouter } from "next/router";
import useSWR from "swr";

import { postIdEndpoint, getPostById } from "@/lib/api/postApi";
import { commentsPostEndpoint, getPostComments } from "@/lib/api/commentsApi";
import Post from "@/components/posts/Post";
import getLayout from '@/layout';

const PostPage = () => {
    const router = useRouter()
    const postId = router.query.id as string
    const { data } = useSWR(`${postIdEndpoint}/${postId}`,() => {
        if(postId) return getPostById(postId)
        return null
    })
    const { data: comments } = useSWR(`${commentsPostEndpoint}/${postId}`,() => {
        if(postId) return getPostComments(postId)
        return null
    })
    console.log({postId, comments})
    return(
        <>
            {data &&
            <>
            
            <Post data={data} enableCommentSection={true} />

            </>
            }
        </>
        
    )
}

PostPage.getLayout = getLayout;

export default PostPage