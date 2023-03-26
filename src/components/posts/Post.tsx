import Image from "next/image"
import { memo } from "react";
  
import UserImage from "@/components/UserImage"
import { PostType, UserType } from "@/types"
import { useSessionUser, SessionUserContextType } from "@/context/SessionUser";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdOutlineModeComment } from "react-icons/md";
import Link from "next/link";


type PostContainerPropsType = {
    data: PostType;
    mutateData: () => Promise<any>;
    page: number;
    index: number;
}

const Post = memo(function Post ({ data, mutateData, page, index }: PostContainerPropsType) {
    const { sessionUserId } = useSessionUser() as SessionUserContextType
    // const { data: userData } = useSWR(userCacheKey + data?.user?.email,getUser(data?.user?.email ?? ""))
    console.count(data.id)
    const postData = data
    const onClickComment = () => {
        
    }
    
    const onLikeClickHandler = () => {
        
    }
    
    return(
        <Link href={`/post/${data.id}`} className="block">
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
        <div className="flex justify-between">
            <span> 
                <FaRegHeart />
                <FaHeart />
            </span>
            
        </div>
        </div>
    </div>
    </Link> 
    )
})

export default Post;