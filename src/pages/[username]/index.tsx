import { useRouter } from 'next/router';
import useSWR from "swr";

import { authenticatedRoute } from '@/utils/redirection';
import getLayout from '@/layout';
import { getUserByUsername,getUserById, userIdEndpoint, userUsernameEndpoint } from '@/lib/api/userApi';
import { useSessionUser, SessionUserContextType } from '@/context/SessionUser';

import Profile from '@/components/Profile';

import { UserType } from '@/types';
import ProfileEditPage from '@/components/ProfileEdit';

export const getServerSideProps = authenticatedRoute

const ProfilePage =  () => {
  const router = useRouter()
  const { username: usernameFromRoute } = router.query
  const visitedUserCacheKey = `${userUsernameEndpoint}/${usernameFromRoute}`
  const { sessionCacheKey, sessionUserId } = useSessionUser() as SessionUserContextType
  const { data: visitedUserData, mutate: visitedUserMutate, isLoading, error } = useSWR(visitedUserCacheKey,() => getUserByUsername(usernameFromRoute as string));
  const {data: sessionUserData, mutate: mutateSessionUser } = useSWR(sessionCacheKey, () => getUserById(sessionUserId))
  const isSessionUserProfile = sessionUserData?.username === usernameFromRoute
  const { query } = useRouter()
  
  if(query.edit === "true") {
    return <ProfileEditPage />
  }
  
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
          isSessionUserProfile={isSessionUserProfile}
          sessionUserId={sessionUserData?.id}
          mutateSessionUser={mutateSessionUser}  
        />
      )
      :
      (
        visitedUserData &&        
        <Profile
          userData={visitedUserData}
          isSessionUserProfile={isSessionUserProfile}
          sessionUserId={sessionUserId}
          mutateSessionUser={mutateSessionUser}
        />
      )
    }
    </>
  )
}

ProfilePage.getLayout = getLayout;

export default ProfilePage;