import { useRouter } from "next/router";
import useSWR from "swr";

import { postIdEndpoint, getPostById } from "@/lib/api/postApi";
import { commentsOfPostEndpoint, getPostComments } from "@/lib/api/commentsApi";

const Post = () => {
    const router = useRouter()
    const postId = router.query.id as string
    const { data: postData } = useSWR(`${postIdEndpoint}/${postId}`,() => getPostById(postId))
    const { data: commentsData } = useSWR(`${commentsOfPostEndpoint}/${postId}`,() => getPostComments(postId))
    const { data: likesData } = useSWR(`${}`)
    
    return(
        <>
        Post
        </>
    )
}

export default Post