import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from "next/link";
import Image from 'next/image';
import { InferGetServerSidePropsType } from 'next'

import { UserType } from '@/types';
import { signOut } from "next-auth/react";
import { authenticatedRoute } from '@/utils/redirection';
import getLayout from '@/layout';
import Posts from '@/components/posts/Posts';
import useSWR from "swr";
import { getUserByUsername, usernameEndpoint as cacheKey } from '@/lib/api/userApi';

import UserImage from '@/components/UserImage';

export const getServerSideProps: GetServerSideProps<{sessionUser: UserType}> = authenticatedRoute

const Profile =  ({ sessionUser }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { username } = router.query
  const { data: user, isLoading, error } = useSWR(cacheKey + username,() => getUserByUsername(username as string))

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
                imageSrc={user?.data?.image}
                width={100}
                height={100}
              />
              <h2>{user?.data?.username}</h2>
            </div>
          </div>
          {}
          {
            sessionUser.username === user?.data?.username
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