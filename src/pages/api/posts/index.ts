import type { NextApiRequest, NextApiResponse } from 'next'

import { PostsApiRequest, ResponseData } from '@/types/api';

export default async function postHandler(
  req: PostsApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { query, method } = req
  const { sid } = query
  // const userId = query.id as string
  const { content, authorId, image } = req.body

  switch (method) {
    case 'GET':
      if(query.q === "all") {
          const data = await prisma?.post.findMany({
            take: 10
          })
         return res.status(200).json({ message: "Posts returned successfully!", data})
      } else if (query.q === "following") {
        const followingData = await prisma?.userFollow.findMany({
          where: { 
            followingId: sid
          }
        })
        console.log({followingData})
        const data = await prisma?.post.findMany({
          where: { authorId }
        })
       return res.status(200).json({message: "Posts returned successfully!", data})
      }
      break;
    case 'POST':

       try{
         const data = await prisma?.post.create({
          data: {
           content: content ?? "",
           authorId,
           image: image,
          } 
         })
         res.status(201).json({ message: "Posts returned successfully!", data})
       } catch (error) {
        console.error(error)
       }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
