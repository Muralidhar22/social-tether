import { GetServerSidePropsContext } from "next";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function authenticatedRoute(ctx: GetServerSidePropsContext) {
    const session = await getServerSession(ctx.req, ctx.res, authOptions)
    const res = await fetch(`${process.env.BASE_URL}/api/user/new/${session?.user?.email}`)
    const result = await res.json()

  if(!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }
  else if(!result.username && ctx.resolvedUrl !== "/new/user") {
    return {
      redirect: {
        destination: "/new/user",
        permanent: false
      }
    }
  } else if(result.username && ctx.resolvedUrl === "/new/user") {
    return {
      redirect: {
        destination: `/profile/${result.username}`,
        permanent: false
      }
    }
  } 
  return {
    props: { session, result }
  }
}