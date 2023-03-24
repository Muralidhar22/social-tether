import useSWR from "swr";
import Link from "next/link";
import { useEffect } from "react";

import { UserType } from "@/types";
import { 
    getSessionUserFollowInfo,
    getUserFollowCount,
    followCountEndpoint as followCountCacheKey,
    followUserEndpoint as followCacheKey,
    addFollow,
    removeFollow } from '@/lib/api/followApi';
import { getPostsCount, postsCountEndpoint } from '@/lib/api/postApi';
import { addFollowOptions, removeFollowOptions } from '@/lib/helperFunctions/followMutationOptions';
import { signOut } from "next-auth/react";
import UserImage from "./UserImage";
import PostsContainer from "./posts/PostsContainer";

type ProfilePropsType = {
    userData: UserType;
    userMutate: any;
    isSessionUserProfile: boolean;
    sessionUserId: string;
}

const Profile = ({
    userData,
    userMutate,
    isSessionUserProfile,
    sessionUserId
}: ProfilePropsType) => {
const postCountCacheKey = `${postsCountEndpoint}/${userData.username}`
const { data:followData, mutate: followMutate } = useSWR(followCacheKey,() => getSessionUserFollowInfo(sessionUserId, userData.id))
const { data:userFollowCount, mutate: mutateUserFollowCount } = useSWR(followCountCacheKey, () => getUserFollowCount(userData.id))
const { data: userPostsInfo, isLoading: userPostsInfoLoading } = useSWR(postCountCacheKey,() => getPostsCount(userData.username))


// useEffect(() => {
    
// },[])

const addFollowClickHandler = async () => {
if(followData){
    await followMutate(
      addFollow(sessionUserId, userData.id, followData),
      addFollowOptions()
    )
    mutateUserFollowCount()
}
    
  }
  
const removeFollowClickHandler = async () => {
    if(followData?.id) {
      await followMutate(
        removeFollow(followData.id),
        removeFollowOptions()
      )
      mutateUserFollowCount()
    }
  }
console.log({isSessionUserProfile})
    return (
        <>
        <h1>Profile Page</h1>
          <div className="grid">
            <div className="cover-img">
              cover image
            </div>
            {/* User image */}
            <div className="">
              <span className="">
                user image
              </span>
              <UserImage
                imageSrc={userData.image}
                width={100}
                height={100}
              />
            </div> 
            {/* Follow button logic */}
            <h2 className="text-center">{userData.username}</h2>
              {!isSessionUserProfile && followData &&
              (
                followData?.isFollowing
                ? <button onClick={removeFollowClickHandler} className="font-semibold px-2 py-4 border rounded border-black dark:border-white">Following</button>
                : <button className="cursor-pointer px-2 py-4 border rounded bg-black text-white dark:bg-white dark:text-black font-semibold" onClick={addFollowClickHandler}>Follow</button>
              )
              } 
              {/* User following, followers, posts count */}
            <div className="flex justify-center gap-5">
                <span className="flex gap-2">Followers&nbsp;{userFollowCount?.followerCount}</span>
                <span className="flex gap-2">Following&nbsp;{userFollowCount?.followingCount}</span>
                <span className="flex gap-2">Posts&nbsp;{userPostsInfo?.count}</span>
              </div>
            </div>
            {/* sign out button if user visits his own profile */}
            {
            isSessionUserProfile
            &&
            <>
              <Link href={`/${userData.username}?edit=true`} shallow>Edit profile</Link>
              <div className="flex justify-center">
                <button className="mt-5 px-10 py-1" onClick={() => signOut()}>Sign out</button>
              </div>
            </>
          }
          <h2>Posts</h2>
          <PostsContainer 
            filter="user"
            userId={userData.id}
          />
        </>
    )
}

export default Profile;