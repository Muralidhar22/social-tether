import { GetServerSidePropsContext } from "next";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';


import { getUserByEmail } from "@/lib/api/userApi";

export async function authenticatedRoute(ctx: GetServerSidePropsContext) {
    const session = await getServerSession(ctx.req, ctx.res, authOptions)
    let userInfoResponse;

    if(!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false
        }
      }
    }
    
   if(session.user?.email) {
    userInfoResponse = await getUserByEmail(session.user.email)
    if(!userInfoResponse?.data?.username && ctx.resolvedUrl !== "/new/user") {
        return {
          redirect: {
            destination: "/new/user",
            permanent: false
          }
        }
    } else if(userInfoResponse?.data?.username && ctx.resolvedUrl === "/new/user") {
        return {
          redirect: {
            destination: `/${userInfoResponse.data.username}`,
            permanent: false
          }
        }
      }
    }
    
    if(!userInfoResponse) {
      return {
        redirect: {
          destination: "/500",
          permanent: false
        }
      }
    }

    return {
      props: { sessionUserId: userInfoResponse.data.id }
    } 
}