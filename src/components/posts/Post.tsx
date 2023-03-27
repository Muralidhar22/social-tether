import Image from "next/image"
import { memo, useMemo } from "react";
import useSWR from "swr";
import Link from "next/link";

import UserImage from "@/components/UserImage"
import { PostType, UserType } from "@/types"
import { useSessionUser, SessionUserContextType } from "@/context/SessionUser";


import { getHasUserBookmarked, bookmarkEndpoint } from "@/lib/api/bookmarkApi";



import useSWRState from "@/hooks/useSWRState";
import CommentSection from "./CommentSection";
import LikeComponent from "./LikeIcon";
import CommentComponent from "./CommentIcon";


type PostContainerPropsType = {
    data: PostType;
    enableCommentSection?: boolean
}

const Post =  ({ data, enableCommentSection }: PostContainerPropsType) => {
    const postData = data
    const { sessionUserId } = useSessionUser() as SessionUserContextType
    // const { data: userData } = useSWR(userCacheKey + data?.user?.email,getUser(data?.user?.email ?? ""))


    const [{data: hasPostBookmarked }] = useSWRState<boolean>(`${bookmarkEndpoint}?q=post&postId=${postData.id}&userId=${sessionUserId}`,() => getHasUserBookmarked(postData.id, sessionUserId))
    console.count(data.id)


    
    return(
<>
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
            <LikeComponent postId={postData.id} />
            <CommentComponent postId={postData.id} />
        </div>
        </div>
    </div>
    {/* comments section */}
    {
        enableCommentSection &&
            <CommentSection postId={postData.id}/>
    }
</>

    )
}

export default memo(Post);