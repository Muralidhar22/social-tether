import useSWR from "swr"

import { getPosts, postsEndpoint as cacheKey } from "@/lib/api/postApi";
import InfiniteScrollComponent from "../InfiniteScroll";
import { PostsFilterType, PostType, UserType } from "@/types";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdOutlineModeComment } from "react-icons/md";
import Image from "next/image";
import UserImage from "../UserImage";
import { userEmailEndpoint as userCacheKey } from "@/lib/api/userApi";

type PostContainerPropsType = {
    postData: PostType
    userData: UserType
}

const PostContainer = ({ postData }: PostContainerPropsType) => {
    // const { data: userData } = useSWR(userCacheKey + data?.user?.email,getUser(data?.user?.email ?? ""))
    
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
    
    

type PostsPropsType = {
    filter: PostsFilterType
    sessionUserId: string
}

const Posts = ({ filter,sessionUserId, }: PostsPropsType) => {    

    return (
        <InfiniteScrollComponent cacheKey={cacheKey} fetcher={() => getPosts(filter, sessionUserId)} ComponentToRender={PostContainer} />
    )
}

export default Posts;