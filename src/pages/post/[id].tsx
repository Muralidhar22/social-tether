import { useRouter } from "next/router";
import useSWR from "swr";

import { postIdEndpoint, getPostById } from "@/lib/api/postApi";
import { commentsPostEndpoint, getPostComments } from "@/lib/api/commentsApi";
import Post from "@/components/posts/Post";
import getLayout from '@/layout';
import { useSessionUser, SessionUserContextType } from "@/context/SessionUser";
import { authenticatedRoute } from "@/utils/redirection";

export const getServerSideProps = authenticatedRoute

const PostPage = () => {
    const { sessionUserId } = useSessionUser() as SessionUserContextType
    const router = useRouter()
    const postId = router.query.id as string
    const { data: postData } = useSWR(`${postIdEndpoint}/${postId}`,() => {
        if(postId) return getPostById(postId)
        return null
    })
    
    return(
        <>
            {postData &&
            <>
            {sessionUserId === postData.authorId && <button>Edit post</button>}
            <Post data={postData} enableCommentSection={true} />

            </>
            }
        </>
        
    )
}

PostPage.getLayout = getLayout;

export default PostPage