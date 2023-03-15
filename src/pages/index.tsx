import Head from 'next/head'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next'

import { authenticatedRoute } from '@/utils/redirection';
import { PostsFilterType, UserType } from '@/types';
import getLayout from '@/layout';
import Posts from '@/components/posts/Posts';
import SideNav from '@/components/SideNav';

export const getServerSideProps: GetServerSideProps<{userDetails: UserType}>  = authenticatedRoute

const Home = ({ userDetails }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession()
  const [postsFilter, setPostsFilter] = useState<PostsFilterType>("all")
  
  // useEffect(() => {
    
  // },[])

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
          <h2>{session?.user?.name}</h2>
          <h2>{session?.user?.email}</h2>
          <h2>{userDetails.username}</h2>
          <div className="flex justify-center">
            <button className="mt-5 px-10 py-1" onClick={() => signOut()}>Sign out</button>
          </div>
              <SideNav username={userDetails.username} />
              <div className="flex justify-center">
               <Posts filter={postsFilter} />
              <Link href={`/${userDetails.username}`} className="mt-5 px-10 py-1">Profile</Link>
          </div>
        </div>
      </div>
    </>
  )
}

Home.getLayout = getLayout;

export default Home;