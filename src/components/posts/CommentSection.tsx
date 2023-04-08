import useSWR from "swr";
import { useState } from "react";

import { useSessionUser, SessionUserContextType } from "@/context/SessionUser";
import { addComment, getPostComments, commentsPostEndpoint } from "@/lib/api/commentsApi";
import UserImage from "../UserImage";
import Link from "next/link";

type CommentSectionProps = {
    postId: string;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
    const { sessionUserId } = useSessionUser() as SessionUserContextType
    const { data: commentsList, mutate: mutateCommentsList } = useSWR(`${commentsPostEndpoint}/${postId}`,() => getPostComments(postId))
    const [ commentText, setCommentText ] = useState<string>()

    const onClickComment = async () => {
        if(commentText) {
            await addComment(postId, sessionUserId, commentText)
            mutateCommentsList()
            setCommentText("")
        }
    }

    return (
        <>
                    <hr />
                <div className="relative">
                    <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} name="" className="w-full" placeholder="type your comment" id="" cols={30} rows={10}></textarea>
                    <button onClick={onClickComment} className="absolute bottom-5 right-5 dark:bg-black">comment</button>
                </div>
                <hr />
                {commentsList?.length}&nbsp;comments
                <hr />
                <div>
                    {commentsList?.map(comment => (
                        <div key={comment.id}>
                                <div className="w-full flex gap-3 items-start mb-5" >
                                    <UserImage imageSrc={comment?.user?.image}  />
                                    <div>
                                    <Link className="block font-bold" href={`/${comment?.user.username}`}>{comment?.user.username}</Link>
                                        {comment.content}
                                    </div>
                                </div>
                                <hr />
                        </div>
                    ))
                        
                    }
                </div>
        </>
    )
}

export default CommentSection;