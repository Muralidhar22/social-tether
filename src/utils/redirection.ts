import { GetServerSidePropsContext } from "next";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { getUser } from "@/lib/api/userApi";

export async function authenticatedRoute(ctx: GetServerSidePropsContext) {
    const session = await getServerSession(ctx.req, ctx.res, authOptions)
    const userDetails = session?.user?.email && await getUser("new",session.user.email)

  if(!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }
  else if(userDetails) {
    if(!userDetails.username && ctx.resolvedUrl !== "/new/user") {
      return {
        redirect: {
          destination: "/new/user",
          permanent: false
        }
      }
    } else if(userDetails.username && ctx.resolvedUrl === "/new/user") {
      return {
        redirect: {
          destination: `/${userDetails.username}`,
          permanent: false
        }
      }
    } 
  } else {
    return {
      redirect: {
        destination: "500",
        permanent: false
      }
    }
  }
  return {
    props: { session, userDetails }
  }
}