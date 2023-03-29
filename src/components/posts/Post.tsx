import Image from "next/image"
import { memo, useMemo } from "react";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/router";

import UserImage from "@/components/UserImage"
import { PostType, UserType } from "@/types"
import { useSessionUser, SessionUserContextType } from "@/context/SessionUser";

import { getLikesCount, getHasUserLikedPost, likesPostEndpoint, addLike, removeLike, likesEndpoint } from "@/lib/api/likesApi";
import { getHasUserBookmarked, bookmarkEndpoint, removeBookmark, addBookmark } from "@/lib/api/bookmarkApi";

import CommentSection from "./CommentSection";
import { getCommentsCount, commentsPostEndpoint } from "@/lib/api/commentsApi";

import { MdOutlineModeComment } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaBookmark, FaRegBookmark } from "react-icons/fa"

type PostContainerPropsType = {
    data: PostType;
    enableCommentSection?: boolean
}

const Post =  (props: PostContainerPropsType) => {
    const router = useRouter()
    const postData = props.data
    const { sessionUserId } = useSessionUser() as SessionUserContextType
    const {data: hasPostBookmarked, mutate: mutateHasPostBookmarked } = useSWR(`${bookmarkEndpoint}?q=post&postId=${postData.id}&userId=${sessionUserId}`,() => getHasUserBookmarked(postData.id, sessionUserId))
    const { data: likesCount,mutate: mutateLikesCount} = useSWR(`${likesPostEndpoint}/${postData.id}?q=count`,() => getLikesCount(postData.id))
    const { data: hasUserLiked ,mutate: mutateHasUserLiked } = useSWR(`${likesPostEndpoint}/${postData.id}?q=user`,() => getHasUserLikedPost(postData.id,sessionUserId))
    const { data: commentsCount, mutate: mutateCommentsCount } = useSWR(`${commentsPostEndpoint}/${postData.id}?q=count`,() => getCommentsCount(postData.id))
    const isPostPage = router.pathname.startsWith("/post")
    
    const toggleLike = async () => {

        if(hasUserLiked && hasUserLiked.value) {
            await removeLike(hasUserLiked.id)
            mutateLikesCount()
            mutateHasUserLiked()
        } else {
            await addLike(postData.id, sessionUserId)
            mutateLikesCount()
            mutateHasUserLiked()
            
        }
    }
    
    const toggleBookmark = async () => {
        if(hasPostBookmarked && hasPostBookmarked.value) {
            await removeBookmark(hasPostBookmarked.id)
            mutateHasPostBookmarked()
        } else {
            await addBookmark(postData.id, sessionUserId) 
            mutateHasPostBookmarked()
        }
    }
    
    return(
<>
    <div className="w-full flex gap-3 items-start mb-5" >
        {/* user profile image */}
        <div className={`${!isPostPage && "sticky top-10"}`}>
            <UserImage imageSrc={postData?.author?.image}  />
        </div>
        
   
        {/* post content */}
        <div className="w-full border-2 border-zinc-500">
        <Link className="block font-bold" href={`/${postData?.author.username}`}>{postData?.author?.username}</Link>
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
            <Link className="w-full block" href={`/post/${postData.id}`}>
                <p>
                    {postData?.content && postData.content}
                </p>
            </Link>
        <div className="flex justify-evenly items-center">
            <span className="flex gap-1 items-center">
                <span onClick={toggleLike}>
                    {!hasUserLiked?.value && <FaRegHeart className="cursor-pointer"/>}
                    {hasUserLiked?.value && <FaHeart color="red" className="cursor-pointer" />}
                </span> 
                {likesCount}
            </span>
            <span className="flex items-center gap-1">
                <Link href={`/post/${postData.id}`} >
                    <MdOutlineModeComment />
                </Link> 
                <span>{commentsCount}</span>
            </span>
            <span className="cursor-pointer" onClick={toggleBookmark}>
                {!hasPostBookmarked?.value && <FaRegBookmark />}
                {hasPostBookmarked?.value && <FaBookmark className="text-blue-400"/>}
            </span>
        </div>
        </div>
    </div>
    {/* comments section */}
    {
        props.enableCommentSection &&
            <CommentSection postId={postData.id} mutateCommentsCount={mutateCommentsCount} />
    }
</>

    )
}

export default memo(Post);