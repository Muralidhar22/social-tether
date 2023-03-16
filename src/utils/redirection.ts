import { GetServerSidePropsContext } from "next";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';


import { getUser } from "@/lib/api/userApi";

export async function authenticatedRoute(ctx: GetServerSidePropsContext) {
    const session = await getServerSession(ctx.req, ctx.res, authOptions)
    const response = await getUser(session?.user?.email ?? "")

  if(!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }
  else if(!response?.data?.username) {
      return {
        redirect: {
          destination: "/new/user",
          permanent: false
        }
      }
  } else if(response?.data?.username && ctx.resolvedUrl === "/new/user") {
      return {
        redirect: {
          destination: `/${response.data.username}`,
          permanent: false
        }
      }
    } 
  
  return {
    props: { sessionUser: response.data }
  }
}