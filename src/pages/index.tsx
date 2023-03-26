import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image';
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from 'next/router';

import { authenticatedRoute } from '@/utils/redirection';
import { PostsFilterType, UserType } from '@/types';
import getLayout from '@/layout';
import Posts from '@/components/posts/PostsContainer';
import UserImage from '@/components/UserImage';
import { getRandomUsers, getUserById, randomUsersEndpoint as cacheKey } from '@/lib/api/userApi';
import useSWRState from '@/hooks/useSWRState';
import { SessionUserContextType, useSessionUser } from '@/context/SessionUser';

export const getServerSideProps = authenticatedRoute

const Home = () => {
  const [postsFilter, setPostsFilter] = useState<PostsFilterType>("following")
  const { sessionCacheKey, sessionUserId } = useSessionUser() as SessionUserContextType
  const [ { data: sessionUserData },  ] = useSWRState<UserType>(sessionCacheKey,() => getUserById(sessionUserId))
  const { isLoading, data: randomUsers, error } = useSWR(() => `${cacheKey}?username=` + sessionUserData.username,() => getRandomUsers(sessionUserData?.username))
  const router = useRouter()

  useEffect(() => {
    const { query } = router
    if(query.feed === "explore") {
      setPostsFilter("all")
    } 
  },[router])

  return (
    <>
      <Head>
        <title>Tether</title>
        <meta name="description" content="Tether - Social media app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Tether" key="title" />
      </Head>

        <div className="flex gap-5 justify-center items-start">
          {sessionUserId && <Posts filter={postsFilter} userId={sessionUserId} />}

            <div className="border-2 rounded-md border-zinc-500 hidden lg:block p-2 w-80">
              <h2>Users to follow</h2>   
              {
                isLoading 
                ?
                <span>loading...</span>
                :
                randomUsers?.data && randomUsers?.data.map((user) => (
                  <span key={user.id} className="bg-red-500 text-white font-bold m-2 flex gap-3">
                    <UserImage 
                        imageSrc={user.image}
                    />
                      <Link href={`/${user.username}`}>{user.username}</Link>
                  </span>
                ) )
              }
            </div>
        </div>
    </>
  )
}

Home.getLayout = getLayout;

export default Home;