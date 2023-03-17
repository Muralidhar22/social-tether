import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from "next/link";
import Image from 'next/image';
import { InferGetServerSidePropsType } from 'next'

import { UserFollowType } from '@/types';
import { FollowApiResponse } from '@/types/api';
import { UserType } from '@/types';
import { signOut } from "next-auth/react";
import { authenticatedRoute } from '@/utils/redirection';
import getLayout from '@/layout';
import Posts from '@/components/posts/Posts';
import useSWR from "swr";
import { getUserById, usernameEndpoint as userCacheKey } from '@/lib/api/userApi';
import { 
  getIsUserFollowInfo,
  getUserFollowCount,
  followCountEndpoint as followCountCacheKey,
  followUserEndpoint as followCacheKey,
  addFollow,
  removeFollow } from '@/lib/api/followApi';
import { getPostsCount, postsCountEndpoint } from '@/lib/api/postApi';
import { addFollowOptions } from '@/lib/helperFunctions/followMutationOptions';

import UserImage from '@/components/UserImage';

export const getServerSideProps: GetServerSideProps<{ sessionUser: UserType }> = authenticatedRoute

const Profile =  ({ sessionUser }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { username } = router.query
  const userDetailsCacheKey = userCacheKey + username
  const isSessionUserProfile = sessionUser?.username === username 
  const { data: userResponse, mutate: userMutate, isLoading, error } = useSWR(userDetailsCacheKey,() => getUserByUsername(username as string));
  const userFollowCacheKey = followCacheKey + sessionUser?.id + userResponse?.data.id
  const { data: followData, mutate: followMutate, isLoading: followInfoLoading, error: followInfoError } = useSWR(userFollowCacheKey,() => getIsUserFollowInfo(sessionUser?.id, userResponse?.data.id))
  const { data: userFollowCount } = useSWR(followCountCacheKey + userResponse?.data?.username, () => getUserFollowCount(userResponse?.data.id))
  const { data: userPostsInfo, isLoading: userPostsInfoLoading } = useSWR(postsCountEndpoint + userResponse?.data?.username,() => getPostsCount(userResponse?.data.id))
  console.log({userPostsInfo, userPostsInfoLoading })

  const addFollowClickHandler = async () => {
    if(userResponse?.data && followData) { 
      await followMutate(
        addFollow(sessionUser?.id, userResponse?.data.id, followData),
        addFollowOptions()
      )
      userMutate()
    }
  }
  
  const removeFollowClickHandler = async () => {
    if(userResponse?.data && followData?.id) {
      await removeFollow(followData.id)
      followMutate()
      userMutate()
    }
  }

    return(
        <>
          <h1>Profile Page</h1>
          <div className="grid">
            <div className="cover-img">
              cover image
            </div>
            <div className="">
              <span className="">
                user image
              </span>
              <UserImage
                imageSrc={userResponse?.data?.image}
                width={100}
                height={100}
              />
              <h2 className="text-center">{userResponse?.data?.username}</h2>
              {!isSessionUserProfile && followData &&
              (
                followData?.isFollowing
                ? <button onClick={removeFollowClickHandler} className="font-semibold px-2 py-4 border rounded border-black dark:border-white">Following</button>
                : <button className="cursor-pointer px-2 py-4 border rounded bg-black text-white dark:bg-white dark:text-black font-semibold" onClick={addFollowClickHandler}>Follow</button>
              )
              }
              <div className="flex justify-center gap-5">
                <span className="flex gap-2">Followers&nbsp;{userFollowCount?.followingCount}</span>
                <span className="flex gap-2">Following&nbsp;{userFollowCount?.followerCount}</span>
                <span className="flex gap-2">Posts&nbsp;{userPostsInfo?.count}</span>
              </div>
            </div>
          </div>
          {}
          {
            sessionUser?.username === userResponse?.data?.username
            &&
            <>
              <Link href={`/${username}?edit=true`} shallow>Edit profile</Link>
              <div className="flex justify-center">
                <button className="mt-5 px-10 py-1" onClick={() => signOut()}>Sign out</button>
              </div>
            </>
          }
        </>
    )
}

Profile.getLayout = getLayout;

export default Profile;