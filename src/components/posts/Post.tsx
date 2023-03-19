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
    <div className="border-2 w-72 p-2 border-zinc-500" >
        <div className="flex gap-2 items-center">
            <UserImage imageSrc={postData?.author?.image}  />
            <h3>{postData?.author?.username}</h3>
        </div>
        <div className="w-full h-44">
            {postData?.content && postData.content}
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
        </div>
        <div className="flex justify-between">
            <div> 
                <FaRegHeart />
                <FaHeart />
            </div>
        </div>
    </div>
        
    )
}

export default Post;