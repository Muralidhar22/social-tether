import { useSessionUser, SessionUserContextType } from "@/context/SessionUser";


const CommentSection = ({ postId }: { postId: string }) => {
    const { sessionUserId } = useSessionUser() as SessionUserContextType

    const onClickComment = () => {
        
    }
    
    return (
        <>
                    <hr />
                <div className="relative">
                    <textarea name="" className="w-full" placeholder="type your comment" id="" cols={30} rows={10}></textarea>
                    <button onClick={onClickComment} className="absolute bottom-5 right-5">comment</button>
                </div>
                <hr />
        </>
    )
}

export default CommentSection;