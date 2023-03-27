import useSWRState from "@/hooks/useSWRState";
import { getLikesCount, getHasUserLikedPost, likesPostEndpoint } from "@/lib/api/likesApi";
import { useSessionUser, SessionUserContextType } from "@/context/SessionUser";

import { FaRegHeart, FaHeart } from "react-icons/fa";

const LikeComponent = ({ postId }: { postId: string }) => {
    const { sessionUserId } = useSessionUser() as SessionUserContextType
    const [{ data: likesCount }] = useSWRState<number>(`${likesPostEndpoint}/${postId}?q=count`,() => getLikesCount(postId))
    const [{ data: hasUserLiked }] = useSWRState<boolean>(`${likesPostEndpoint}/${postId}?q=user`,() => getHasUserLikedPost(postId,sessionUserId))
    
        
    const onLikeClickHandler = () => {
        
    }
    
    return (
        <>
            <span className="flex gap-1 items-center">
                <span onClick={onLikeClickHandler}>
                    {!hasUserLiked && <FaRegHeart className="cursor-pointer"/>}
                    {hasUserLiked && <FaHeart color="red" className="cursor-pointer" />}
                </span> 
                {likesCount}
            </span>
        </>
    )
}

export default LikeComponent;