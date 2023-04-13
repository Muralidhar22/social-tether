import Image from "next/image"
import { memo, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/router";

import UserImage from "@/components/UserImage"
import { PostType } from "@/types"
import { useSessionUser, SessionUserContextType } from "@/context/SessionUser";
import { getLikes, likesPostEndpoint, addLike, removeLike } from "@/lib/api/likesApi";
import { getHasUserBookmarked, bookmarkEndpoint, removeBookmark, addBookmark } from "@/lib/api/bookmarkApi";
import CommentSection from "./CommentSection";
import { addLikeOptions, removeLikeOptions } from "@/lib/helperFunctions/likesMutationOptions";
import { addBookmarkOptions, removeBookmarkOptions } from "@/lib/helperFunctions/bookmarkMutationOptions";
import toggleBodyScroll from "@/utils/toggleBodyScroll";
import { getUserById } from "@/lib/api/userApi";

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
    const { sessionUserId, sessionCacheKey } = useSessionUser() as SessionUserContextType
    const {data: sessionUserData, mutate: mutateSessionUser } = useSWR(sessionCacheKey, () => getUserById(sessionUserId))
    const {data: hasPostBookmarked, mutate: mutateHasPostBookmarked } = useSWR(`${bookmarkEndpoint}?q=post&postId=${postData.id}&userId=${sessionUserId}`,() => getHasUserBookmarked(postData.id, sessionUserId))
    const { data: likesData,mutate: mutateLikesData} = useSWR(`${likesPostEndpoint}/${postData.id}`,() => getLikes(postData.id, sessionUserId))
    const isPostPage = router.pathname.startsWith("/post")
    const [openImageModal, setOpenImageModal] = useState<boolean>(false)

    console.log(router.query)
    
    const onClickToggleImgModal = (e: React.MouseEvent) => {
        toggleBodyScroll()
        setOpenImageModal(prev => !prev)
    }
    
    const toggleLike = async () => {
        if(likesData?.hasUserLiked && likesData.hasUserLiked.value) {
            await mutateLikesData(removeLike(likesData.hasUserLiked.id), removeLikeOptions())
        } else {
            await mutateLikesData(addLike(postData.id, sessionUserId), addLikeOptions())
        }
    }
    
    const toggleBookmark = async () => {
        if(hasPostBookmarked && hasPostBookmarked.value) {
            await mutateHasPostBookmarked(removeBookmark(hasPostBookmarked.id), removeBookmarkOptions())
        } else {
            await mutateHasPostBookmarked(addBookmark(postData.id, sessionUserId) , addBookmarkOptions())
        }
    }
    
    return(
<> 
   {openImageModal && <div className="fixed z-30 inset-0 bg-neutral-700 bg-opacity-75" onClick={onClickToggleImgModal}>
    <button className="relative z-50 w-10 h-10 text-xl" onClick={(e) => {
          e.stopPropagation();
          onClickToggleImgModal(e);
        }}>&times;</button>
            <Image 
                src={postData.image}
                alt="post image"
                unoptimized
                fill
                className="object-contain"
            />
   </div>}
    <div className="w-full flex gap-3 items-start mb-5" >
        {/* user profile image */}
        <div className={`${!isPostPage && "sticky top-10"}`}>
            <UserImage imageSrc={postData?.author?.image}  />
        </div>

        {/* post content */}
        <div className="max-w-96 w-full border-2 rounded-md border-zinc-500 p-2">
        <div className="flex justify-between items-center">
        <Link className="block font-bold" href={`/${postData?.author.username}`}>{postData?.author?.username}</Link>
        {router.query?.username === sessionUserData?.username && <span className="rotate-90 cursor-pointer">&hellip;</span>}
        </div>
            {postData?.image
                &&
                <div className="cursor-pointer p-2 overflow-hidden max-h-96" onClick={onClickToggleImgModal}>
                     <Image
                        src={postData.image}
                        alt="post image"
                        placeholder="empty"
                        width={400}
                        height={400}
                        className="object-contain object-position-center mx-auto"
                        />
                </div>
            }
            <Link className="w-full block" href={`/post/${postData.id}`}>
                <p>
                    {postData?.content && postData.content}
                </p>
            </Link>
        <div className="flex justify-evenly items-center">
            <span className="flex gap-1 items-center">
                <span onClick={toggleLike}>
                    {!likesData?.hasUserLiked?.value && <FaRegHeart className="cursor-pointer"/>}
                    {likesData?.hasUserLiked?.value && <FaHeart color="red" className="cursor-pointer" />}
                </span> 
                {likesData?.count}
            </span>
            <span className="flex items-center gap-1">
                <Link href={`/post/${postData.id}`} >
                    <MdOutlineModeComment />
                </Link> 
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
            <CommentSection postId={postData.id} />
    }
</>

    )
}

export default memo(Post);