import useSWR, { KeyedMutator } from "swr";
import Link from "next/link";
import { useRouter } from "next/router";

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
import ModalProfile from "./ProfileEdit";
import Image from "next/image";

type ProfilePropsType = {
    userData: UserType;
    isSessionUserProfile: boolean;
    sessionUserId: string;
    mutateSessionUser: KeyedMutator<UserType | undefined>
}

const Profile = ({
    userData,
    isSessionUserProfile,
    sessionUserId,
}: ProfilePropsType) => {
const postCountCacheKey = `${postsCountEndpoint}/${userData.username}`
const { data:followData, mutate: followMutate } = useSWR(followCacheKey,() => getSessionUserFollowInfo(sessionUserId, userData.id))
const { data:userFollowCount, mutate: mutateUserFollowCount } = useSWR(followCountCacheKey, () => getUserFollowCount(userData.id))
const { data: userPostsInfo, isLoading: userPostsInfoLoading } = useSWR(postCountCacheKey,() => getPostsCount(userData.username))
const { asPath } = useRouter()

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

    return (
        <div className="md:mx-auto md:w-1/2 mx-1">
          <div >
              <Image 
                src="/assets/profile-default-bg.png"
                width={720}
                height={250}
                alt="cover image"
                priority
                className="block w-full"
              />
            <div className="px-2 pb-2 border-b-2 border-x-2 border-zinc-500 rounded-b-xl">
              {/* User image */}
              <div className="flex justify-between items-center">
                <div className="-translate-y-1/2">
                  <UserImage
                    imageSrc={userData.image}
                    width={100}
                    height={100}
                    displayBorder={true}
                  />
                </div>
                {/* Follow button logic */}
                {!isSessionUserProfile && followData &&
                (
                  followData?.isFollowing
                  ? <button onClick={removeFollowClickHandler} className="font-semibold px-2 py-4 border rounded border-black dark:border-white">Following</button>
                  : <button className="cursor-pointer px-2 py-4 border rounded bg-black text-white dark:bg-white dark:text-black font-semibold" onClick={addFollowClickHandler}>Follow</button>
                )
                }
                  {isSessionUserProfile && <Link shallow href={`${asPath}?edit=true`}>Edit profile</Link>} 
              </div> 
              <div className="flex items-center gap-2">
                    <h2 className="text-center">@{userData.username}</h2>
                    {followData?.isFollowed && <span className="text-sm font-semibold opacity-50">Follows you</span>}
              </div>
              {userData.bio ? <div className="text-center my-2">{userData.bio}</div> : <div className="text-center my-2">I&apos;m a mysterious person</div>}
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
              <div className="flex justify-center">
                <button className="mt-5 px-10 py-1 border" onClick={() => signOut()}>Sign out</button>
              </div>
            </>
          }
          </div>
          <h2 className="text-center font-bold my-5 border-b">Posts</h2>
          <div>
            <PostsContainer 
              filter="user"
              userId={userData.id}
            />
          </div>
        </div>
    )
}

export default Profile;