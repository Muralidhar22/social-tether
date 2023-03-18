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
import Posts from '@/components/posts/PostsContainer';
import useSWR from "swr";
import { getUserByUsername,getUserById, userIdEndpoint as sessionUserCacheKey, usersEndpoint as userCacheKey } from '@/lib/api/userApi';

import Profile from '@/components/Profile';

import UserImage from '@/components/UserImage';
import useSWRSessionState from '@/hooks/useSWRSessionState';

export const getServerSideProps = authenticatedRoute

const ProfilePage =  ({ sessionUser }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { username: usernameFromRoute } = router.query
  const visitedUserCacheKey = userCacheKey + usernameFromRoute
  const { data: visitedUserData, mutate: visitedUserMutate, isLoading, error } = useSWR(visitedUserCacheKey,() => getUserByUsername(usernameFromRoute as string));
  const [sessionUserData, mutateSessionUser ] = useSWRSessionState(`${sessionUserCacheKey}/${sessionUser.id}`, () => getUserById(sessionUser.id))
  const isSessionUserProfile = sessionUserData?.username === usernameFromRoute
  
  if(sessionUserData || visitedUserData) {
    return(
      <>
      {
        isSessionUserProfile
        ?
        <Profile
          userData={sessionUserData}
          userMutate={mutateSessionUser}
          isSessionUserProfile={isSessionUserProfile}
          sessionUserId={sessionUserData.id}  
        />
        :
        (
          visitedUserData &&        
          <Profile
            userData={visitedUserData}
            userMutate={visitedUserMutate}
            isSessionUserProfile={isSessionUserProfile}
            sessionUserId={sessionUserData.id}
          />
        )
      }
      </>
    )
    
  }
return (
  <div>
    <div>Loading...</div>
    <div>Do you know the meaning of tether?</div>
  </div>
)
  // console.log({userPostsInfo, userPostsInfoLoading })



  //   return(
  //       <>



  //           </div>
  //         </div>
  //         {}

  //       </>
  //   )
}

ProfilePage.getLayout = getLayout;

export default ProfilePage;