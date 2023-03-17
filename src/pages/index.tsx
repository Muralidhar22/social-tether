import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image';
import { useState, useEffect } from "react";
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next';
import useSWR from "swr";
import { useRouter } from 'next/router';

import { authenticatedRoute } from '@/utils/redirection';
import { PostsFilterType, UserType } from '@/types';
import getLayout from '@/layout';
import Posts from '@/components/posts/Posts';
import SideNav from '@/components/SideNav';
import UserImage from '@/components/UserImage';
import { getRandomUsers, randomUsersEndpoint as cacheKey } from '@/lib/api/userApi';

export const getServerSideProps = authenticatedRoute

const Home = ({ sessionUser }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [postsFilter, setPostsFilter] = useState<PostsFilterType>("following")
  const { isLoading, data: randomUsers, error } = useSWR(cacheKey,() => getRandomUsers(sessionUser?.username))
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
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">

          <div className="border-2 rounded-md border-zinc-500 p-2">
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
                   <Link href={`/${user.username}`}>{user.name}</Link>
              </span>
            ) )
          }
          </div>
          <h2>{sessionUser?.username ?? ""}</h2>
              <SideNav username={sessionUser?.username ?? ""} />
              <div className="flex justify-center">
               <Posts filter={postsFilter} sessionUserId={sessionUser?.id ?? ""} />
          </div>
        </div>
      </div>
    </>
  )
}

Home.getLayout = getLayout;

export default Home;