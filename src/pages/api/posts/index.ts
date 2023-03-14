import type { NextApiRequest, NextApiResponse } from 'next'

import { PostsApiRequest } from '@/types/api';

type Data = {
  message: string
  data?: any
}

export default async function postHandler(
  req: PostsApiRequest,
  res: NextApiResponse<Data>
) {
  const { query, method } = req
//   const id = query.id
//   const name = query.name as string
  const postsFilter = query.q
  // const userId = query.id as string
  const { content, authorId, authorEmail } = req.body

  switch (method) {
    case 'GET':
      if(postsFilter === "all") {
          const data = await prisma?.post.findMany({})
          res.status(200).json({ message: "Posts returned successfully!", data})
      } else if (postsFilter === "following") {
        const data = await prisma?.post.findMany({
          where: { authorId }
        })
        res.status(200).json({message: "Posts returned successfully!", data})
      }
      break;
    case 'POST':

       try{
         const data = await prisma?.post.create({
          data: {
           content,
           authorId,
           author: { connect: { email: authorEmail } }
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
