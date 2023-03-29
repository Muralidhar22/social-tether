import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import prisma from "@/lib/client";

export default async function userIdHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req
  const postId = query.postId as string
  const q = query.q as string
  
  
  switch (method) {
    case 'GET':
      if(q === "count") {
          try {
          const data = await prisma?.comment.count({
              where: { postId },
            })
            return res.status(200).json({ message: "Count returned successfully!", data: { count: data }})
            
          } catch (error) {
            console.error(error)
            return res.status(500).json({message: "Something went wrong!", error})
          } finally {
            await prisma?.$disconnect()    
          }
      }
        try {
          const data = await prisma?.comment.findMany({
              where: { postId },
              select: {
                content: true,
                id: true,
                user: {
                  select: {
                    id: true,
                    image: true,
                    username: true,
                  }
                },
                postId: true,
                createdAt: true
              }
            })
            return res.status(200).json({ message: "Comments returned successfully!", data})
            
          } catch (error) {
            console.error(error)
            return res.status(500).json({message: "Something went wrong!", error})
          } finally {
            await prisma?.$disconnect()    
          }
    default:
      res.setHeader('Allow', ['GET'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}