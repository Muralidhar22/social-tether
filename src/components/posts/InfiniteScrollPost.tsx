import Image from "next/image"
import { memo } from "react";
import useSWR from "swr";
import Link from "next/link";

import UserImage from "@/components/UserImage"
import { PostType, UserType } from "@/types"
import { useSessionUser, SessionUserContextType } from "@/context/SessionUser";
import { getLikesCount, getHasUserLikedPost, likesPostEndpoint } from "@/lib/api/likesApi";
import { getCommentsCount, commentsPostEndpoint } from "@/lib/api/commentsApi";
import { getHasUserBookmarked, bookmarkEndpoint } from "@/lib/api/bookmarkApi";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdOutlineModeComment } from "react-icons/md";
import useSWRState from "@/hooks/useSWRState";


type PostContainerPropsType = {
    data: PostType;
    mutateData: () => Promise<any>;
    page: number;
    index: number;
}

const InfiniteScrollPost = memo(function Post ({ data, mutateData, page, index }: PostContainerPropsType) {
    const postData = data
    const { sessionUserId } = useSessionUser() as SessionUserContextType
    // const { data: userData } = useSWR(userCacheKey + data?.user?.email,getUser(data?.user?.email ?? ""))
    const [{ data: likesCount }] = useSWRState<number>(`${likesPostEndpoint}/${postData.id}?q=count`,() => getLikesCount(postData.id))
    const [{ data: hasUserLiked }] = useSWRState<boolean>(`${likesPostEndpoint}/${postData.id}?q=user`,() => getHasUserLikedPost(postData.id,sessionUserId))
    const [{ data: commentsCount }] = useSWRState<number>(`${commentsPostEndpoint}/${postData.id}?q=count`,() => getCommentsCount(postData.id))
    const [{data: hasPostBookmarked }] = useSWRState<boolean>(`${bookmarkEndpoint}?q=post&postId=${postData.id}&userId=${sessionUserId}`,() => getHasUserBookmarked(postData.id, sessionUserId))
    console.log({page, index})

    const onClickComment = () => {
        
    }
    
    const onLikeClickHandler = () => {
        
    }
    
    return(

    <div className="w-full flex gap-3 items-start mb-5" >
        {/* user profile image */}
        <div className="sticky top-10">
            <UserImage imageSrc={postData?.author?.image}  />
        </div>
        
   
        {/* post content */}
        <div className="w-full border-2 border-zinc-500">
        <h3>{postData?.author?.username}</h3>
            {postData?.image
                &&
                <Image
                    className="object-contain"
                    src={postData.image}
                    alt="post image"
                    width={200}
                    height={100}
                    style={{ width: 'auto', height: 'auto' }}
                />
            }
            {postData?.content && postData.content}
        <div className="flex justify-evenly items-center">
            <span className="flex gap-1 items-center">
                <span onClick={onLikeClickHandler}>
                    {!hasUserLiked && <FaRegHeart className="cursor-pointer"/>}
                    {hasUserLiked && <FaHeart color="red" className="cursor-pointer" />}
                </span> 
                {likesCount}
            </span>
            <span className="flex items-center gap-1">
                <Link href={`/post/${data.id}`} >
                    <MdOutlineModeComment />
                </Link> 
                <span>{commentsCount}</span>
            </span>
        </div>
        </div>
    </div>

    )
})

export default InfiniteScrollPost;