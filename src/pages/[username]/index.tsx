import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next'
import useSWR from "swr";

import { authenticatedRoute } from '@/utils/redirection';
import getLayout from '@/layout';
import { getUserByUsername,getUserById, userIdEndpoint, userUsernameEndpoint } from '@/lib/api/userApi';

import Profile from '@/components/Profile';

import useSWRSessionState from '@/hooks/useSWRSessionState';

export const getServerSideProps = authenticatedRoute

const ProfilePage =  ({ sessionUser }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { username: usernameFromRoute } = router.query
  const visitedUserCacheKey = `${userUsernameEndpoint}/${usernameFromRoute}`
  const sessionUserCacheKey = `${userIdEndpoint}/${sessionUser.id}`
  const { data: visitedUserData, mutate: visitedUserMutate, isLoading, error } = useSWR(visitedUserCacheKey,() => getUserByUsername(usernameFromRoute as string));
  const [sessionUserData, mutateSessionUser ] = useSWRSessionState(sessionUserCacheKey, () => getUserById(sessionUser.id))
  const isSessionUserProfile = sessionUserData?.username === usernameFromRoute

  return(
    <>
    {/* {
        <div>
        <div>Loading...</div>
        <div>Do you know the meaning of tether?</div>
      </div>
    } */}
    {
      isSessionUserProfile
      ?
      (sessionUserData &&          
        <Profile
          userData={sessionUserData}
          userMutate={mutateSessionUser}
          isSessionUserProfile={isSessionUserProfile}
          sessionUserId={sessionUserData?.id}  
        />
      )
      :
      (
        visitedUserData &&        
        <Profile
          userData={visitedUserData}
          userMutate={visitedUserMutate}
          isSessionUserProfile={isSessionUserProfile}
          sessionUserId={sessionUserData?.id}
        />
      )
    }
    </>
  )
}

ProfilePage.getLayout = getLayout;

export default ProfilePage;