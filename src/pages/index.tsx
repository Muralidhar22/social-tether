import Head from 'next/head'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react";
import { GetServerSideProps } from 'next';
import getLayout from '@/layout/Layout';
import { authenticatedRoute } from '@/utils/redirection';
import Posts from '@/components/posts/Posts';

export const getServerSideProps: GetServerSideProps = authenticatedRoute

const Home = ({ result }: { result: any }) => {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Tether</title>
        <meta name="description" content="Tether - Social media app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Tether" key="title" />
      </Head>
      <div className="flex flex-col gap-10 dark:bg-gray-500">
        <div className="flex flex-col gap-5">
          <h2>{session?.user?.name}</h2>
          <h2>{session?.user?.email}</h2>
          <h2>{result.username}</h2>
          <div className="flex justify-center">
            <button className="mt-5 px-10 py-1" onClick={() => signOut()}>Sign out</button>
          </div>
              <div className="flex justify-center">
               <Posts />
              <Link href={`/profile/${result.username}`} className="mt-5 px-10 py-1">Profile</Link>
          </div>
        </div>
      </div>
    </>
  )
}

Home.getLayout = getLayout;

export default Home;