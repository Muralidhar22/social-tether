import Link from "next/link";

import { getCommentsCount, commentsPostEndpoint } from "@/lib/api/commentsApi";
import useSWRState from "@/hooks/useSWRState";

import { MdOutlineModeComment } from "react-icons/md";

const CommentComponent = ({ postId }: { postId: string }) => {
    const [{ data: commentsCount }] = useSWRState<number>(`${commentsPostEndpoint}/${postId}?q=count`,() => getCommentsCount(postId))
    return(
        <>
            <span className="flex items-center gap-1">
                <Link href={`/post/${postId}`} >
                    <MdOutlineModeComment />
                </Link> 
                <span>{commentsCount}</span>
            </span>
        </>
    )
}

export default CommentComponent;