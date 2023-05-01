import { GetServerSidePropsContext } from "next";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from "@/lib/client";

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
     try {
          userInfoResponse = await  prisma?.user.findFirst({
                where: { email: session.user.email },
                select: {
                   email: true,
                    id: true,
                    image: true,
                    name: true,
                    username: true,
                },
              })
            } catch (error) {
              console.error(error)
            } finally {
              await prisma?.$disconnect()    
    }

    if(!userInfoResponse?.username && ctx.resolvedUrl !== "/new/user") {
        return {
          redirect: {
            destination: "/new/user",
            permanent: false
          }
        }
    } else if(userInfoResponse?.username && ctx.resolvedUrl === "/new/user") {
        return {
          redirect: {
            destination: `/${userInfoResponse.username}`,
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
      props: { sessionUserId: userInfoResponse.id }
    } 
}