import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/client";
import { PostsApiRequest, ResponseData } from '@/types/api';

export default async function postHandler(
  req: PostsApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { query, method } = req
  const { userId, cursor, limit } = query
  // const userId = query.id as string
  const { content, authorId, image } = req.body
  const queryOptions: any = {
    take: parseInt(limit),
    select: {
      author:  {
        select: {
          name: true,
          image: true,
          id: true,
          username: true,
        }
      },
      authorId: true,
      id: true,
      image: true,
      likes: true,
      content: true,
      createdAt: true,
      updatedAt: true
    }
  };
  switch (method) {
    case 'GET':
      // adding cursorId if exists
      if(cursor) {
        queryOptions.cursor = {
          id: cursor
        }
        queryOptions.skip = 1
      }
      if(query.q === "all") {
        try {
          const data = await prisma?.post.findMany({
            ...queryOptions,
            orderBy: {
              updatedAt: "desc"
            }
          })
        const lastPostInResults = data && data[queryOptions.take - 1] 
        const nextCursor = lastPostInResults?.id 
        return res.status(200).json({message: "All posts returned successfully!", data: {
        posts: data,
        nextCursor
          }
        })
      }  catch (error) {
        console.error(error)
        return res.status(500).json({message: "Something went wrong!", error})
    } finally {
       await prisma?.$disconnect()    
    }
      } else if (query.q === "following") {
        const followingData = await prisma?.userFollow.findMany({
          where: { 
            followerId: userId
          },
        })
        // adding query options
        queryOptions.where = {
          authorId: {
            in: followingData?.map((followingUser) => followingUser.followingId)
          }
        }
        try {
            const data = await prisma?.post.findMany({
              ...queryOptions,
              orderBy: {
                updatedAt: "desc"
              }
            })
            const lastPostInResults = data && data[queryOptions.take - 1] 
            const nextCursor = lastPostInResults?.id 
            return res.status(200).json({message: "Posts returned successfully!", data: {
            posts: data,
            nextCursor
            }})
          
        }  catch (error) {
          console.error(error)
          return res.status(500).json({message: "Something went wrong!", error})
      } finally {
         await prisma?.$disconnect()    
      }
      } else if(query.q === "user") {
        queryOptions.where = {
          authorId: userId
        }
        try{
          
          const userPosts = await prisma?.post.findMany({
            ...queryOptions,
            orderBy: {
              updatedAt: "desc"
            }
          })
          const lastPostInResults = userPosts && userPosts[queryOptions.take - 1] 
          const nextCursor = lastPostInResults?.id 

          return res.status(200).json({message: "User posts returned successfully!", data: {
            posts: userPosts,
            nextCursor
          }})
        } catch (error) {
          console.error(error)
          return res.status(500).json({message: "Something went wrong!", error})
      } finally {
         await prisma?.$disconnect()    
      }
      }
    case 'POST':
       try{
         const data = await prisma?.post.create({
          data: {
           content: content ?? "",
           authorId,
           image: image,
          } 
         })
        return res.status(201).json({ message: "Posts returned successfully!", data})
       }  catch (error) {
        console.error(error)
        return res.status(500).json({message: "Something went wrong!", error})
    } finally {
       await prisma?.$disconnect()    
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
