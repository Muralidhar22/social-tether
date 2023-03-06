import Head from 'next/head'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react";
import type { Session } from 'next-auth';
import { getServerSession } from 'next-auth';
import { GetServerSideProps } from 'next';
import { authOptions } from './api/auth/[...nextauth]';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  
  if(!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }
  
  return {
    props: { session }
  }
}

export default function Home() {
  const { data: session } = useSession()
  
  return (
    <>
      <Head>
        <title>Tether</title>
        <meta name="description" content="Tether - Social media app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Tether" key="title" />
      </Head>
      <div className="flex flex-col gap-10">
        {session ? AuthorizedDisplay(session) : GuestDisplay()}
      </div>
    </>
  )
}

function GuestDisplay() {
  return(
    <div className="flex flex-col gap-5">
      <h1 className="text-center">Guest Display</h1>
      <div className="flex justify-center">
      <Link href="/login" className="mt-5 px-10 py-1">Sign In</Link>
        
      </div>
    </div>
  )
}

function AuthorizedDisplay(session: Session) {
  return(
    <div className="flex flex-col gap-5">
    <h2 className="text-center">Authorized display</h2>
    <h2>{session.user?.name}</h2>
    <h2>{session.user?.email}</h2>
    <div className="flex justify-center">
      <button className="mt-5 px-10 py-1" onClick={() => signOut()}>Sign out</button>
    </div>
    <div className="flex justify-center">
      
    <Link href="/profile" className="mt-5 px-10 py-1">Profile</Link>
    </div>
  </div>
  )
}
