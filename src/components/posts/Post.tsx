import Image from "next/image"

import UserImage from "@/components/UserImage"
import { PostType, UserType } from "@/types"

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdOutlineModeComment } from "react-icons/md";

type PostContainerPropsType = {
    data: PostType;
    mutateData: () => Promise<any>;
    page: number;
    index: number;
}

const Post = ({ data, mutateData, page, index }: PostContainerPropsType) => {
    // const { data: userData } = useSWR(userCacheKey + data?.user?.email,getUser(data?.user?.email ?? ""))
    const postData = data
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
                />
            }
            {postData?.content && postData.content}
        <div className="flex justify-between">
            <div> 
                <FaRegHeart />
                <FaHeart />
            </div>
        </div>
        </div>
    </div>
        
    )
}

export default Post;